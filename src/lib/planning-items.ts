import { ObjectId, type WithId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { DATE_RE, TIME_RE } from "@/lib/planning-api";
import {
  isPlanningItemKind,
  isPlanningPerson,
  planningPeople,
  type AttendanceResponse,
  type PlanningItem,
  type PlanningItemInput,
  type PlanningPerson,
} from "@/data/planning";

const COLLECTION = "planning_items";

export type PlanningItemDoc = Omit<PlanningItem, "id"> & {
  // Laatste dag van het item (endDate ?? startDate); hierop filteren we
  // "komende" items zodat voorbije klussen en afspraken vanzelf verdwijnen.
  lastDate: string;
  updatedAt: Date;
};

export async function itemsCollection() {
  return (await getDb()).collection<PlanningItemDoc>(COLLECTION);
}

export function toObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) && /^[0-9a-f]{24}$/i.test(id)
    ? new ObjectId(id)
    : null;
}

export function toPlanningItem(doc: WithId<PlanningItemDoc>): PlanningItem {
  return {
    id: doc._id.toHexString(),
    kind: doc.kind,
    title: doc.title,
    client: doc.client,
    location: doc.location,
    startDate: doc.startDate,
    endDate: doc.endDate,
    startTime: doc.startTime,
    endTime: doc.endTime,
    people: doc.people ?? [],
    responses: doc.responses ?? {},
    notes: doc.notes,
  };
}

function optionalText(
  value: unknown,
  max: number
): { ok: true; value?: string } | { ok: false } {
  if (value === undefined || value === null) return { ok: true };
  if (typeof value !== "string") return { ok: false };
  const trimmed = value.trim();
  if (trimmed.length > max) return { ok: false };
  return { ok: true, value: trimmed || undefined };
}

function isValidDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  // Vangt 31 februari e.d. af.
  const date = new Date(`${value}T00:00:00Z`);
  return date.toISOString().slice(0, 10) === value;
}

// Valideert formulier-invoer. Geeft een Nederlandse foutmelding terug bij
// ongeldige invoer, anders de opgeschoonde velden.
export function parseItemInput(
  body: unknown
): { ok: true; input: PlanningItemInput } | { ok: false; error: string } {
  const raw = (body ?? {}) as Record<string, unknown>;

  if (!isPlanningItemKind(raw.kind)) {
    return { ok: false, error: "Onbekend soort item." };
  }
  const kind = raw.kind;

  const title = optionalText(raw.title, 120);
  if (!title.ok || !title.value) {
    return { ok: false, error: "Vul in wat het is (max. 120 tekens)." };
  }
  const client = optionalText(raw.client, 120);
  const location = optionalText(raw.location, 200);
  const notes = optionalText(raw.notes, 2000);
  if (!client.ok || !location.ok || !notes.ok) {
    return { ok: false, error: "Een van de tekstvelden is te lang." };
  }

  if (typeof raw.startDate !== "string" || !isValidDate(raw.startDate)) {
    return { ok: false, error: "Kies een geldige datum." };
  }
  const startDate = raw.startDate;

  let endDate: string | undefined;
  if (kind === "klus" && raw.endDate) {
    if (typeof raw.endDate !== "string" || !isValidDate(raw.endDate)) {
      return { ok: false, error: "Kies een geldige einddatum." };
    }
    if (raw.endDate < startDate) {
      return { ok: false, error: "De einddatum ligt vóór de begindatum." };
    }
    if (raw.endDate > startDate) endDate = raw.endDate;
  }

  const times: (string | undefined)[] = [];
  for (const value of [raw.startTime, raw.endTime]) {
    if (value === undefined || value === null || value === "") {
      times.push(undefined);
    } else if (typeof value === "string" && TIME_RE.test(value)) {
      times.push(value);
    } else {
      return { ok: false, error: "Vul een geldige tijd in (uu:mm)." };
    }
  }
  const [startTime, endTime] = times;
  if (endTime && !startTime) {
    return { ok: false, error: "Vul ook een begintijd in." };
  }
  // Bij een klus over meerdere dagen mag de eindtijd vroeger zijn.
  if (startTime && endTime && !endDate && endTime <= startTime) {
    return { ok: false, error: "De eindtijd ligt vóór de begintijd." };
  }

  if (!Array.isArray(raw.people) || !raw.people.every(isPlanningPerson)) {
    return { ok: false, error: "Ongeldige namen gekozen." };
  }
  // Ontdubbelen en in vaste volgorde zetten.
  const chosen = new Set<PlanningPerson>(raw.people);
  const people = planningPeople.filter((name) => chosen.has(name));

  return {
    ok: true,
    input: {
      kind,
      title: title.value,
      client: client.value,
      location: location.value,
      startDate,
      endDate,
      startTime,
      endTime,
      people,
      notes: notes.value,
    },
  };
}

// Houdt alleen antwoorden over van mensen die (nog) uitgenodigd zijn.
export function keepResponsesOf(
  responses: Partial<Record<PlanningPerson, AttendanceResponse>>,
  people: PlanningPerson[]
): Partial<Record<PlanningPerson, AttendanceResponse>> {
  const kept: Partial<Record<PlanningPerson, AttendanceResponse>> = {};
  for (const name of people) {
    const response = responses[name];
    if (response) kept[name] = response;
  }
  return kept;
}

// Mongo slaat undefined-velden niet netjes weg bij $set; daarom splitsen we
// in te zetten en te verwijderen velden.
export function toUpdate(input: PlanningItemInput) {
  const set: Record<string, unknown> = {
    lastDate: input.endDate ?? input.startDate,
    updatedAt: new Date(),
  };
  const unset: Record<string, ""> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) unset[key] = "";
    else set[key] = value;
  }
  return { set, unset };
}
