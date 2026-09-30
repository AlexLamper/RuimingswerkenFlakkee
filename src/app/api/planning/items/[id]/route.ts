import { NextResponse } from "next/server";
import { hasPlanningAccess } from "@/lib/planning-auth";
import { isDatabaseConfigured } from "@/lib/mongodb";
import {
  badRequest,
  databaseUnavailable,
  notFound,
  serverError,
  unauthorized,
} from "@/lib/planning-api";
import {
  itemsCollection,
  parseItemInput,
  toObjectId,
  toPlanningItem,
  toUpdate,
} from "@/lib/planning-items";
import {
  isAttendanceResponse,
  isPlanningPerson,
  planningPeople,
} from "@/data/planning";

type Context = { params: Promise<{ id: string }> };

async function readJson(request: Request): Promise<unknown | undefined> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

// PUT /api/planning/items/:id — item volledig bijwerken.
// Antwoorden van mensen die niet meer uitgenodigd zijn worden gewist; de
// overige antwoorden blijven staan.
export async function PUT(request: Request, { params }: Context) {
  if (!(await hasPlanningAccess())) return unauthorized();

  const _id = toObjectId((await params).id);
  if (!_id) return notFound();

  const body = await readJson(request);
  if (body === undefined) return badRequest();
  const parsed = parseItemInput(body);
  if (!parsed.ok) return badRequest(parsed.error);
  if (!isDatabaseConfigured()) return databaseUnavailable();

  const { input } = parsed;
  const { set, unset } = toUpdate(input);
  if (input.kind === "klus") {
    unset.responses = "";
  } else {
    for (const name of planningPeople) {
      if (!input.people.includes(name)) unset[`responses.${name}`] = "";
    }
  }

  try {
    const doc = await (await itemsCollection()).findOneAndUpdate(
      { _id },
      Object.keys(unset).length ? { $set: set, $unset: unset } : { $set: set },
      { returnDocument: "after" }
    );
    if (!doc) return notFound("Dit item bestaat niet meer.");
    return NextResponse.json({ item: toPlanningItem(doc) });
  } catch (error) {
    console.error("Planning-item bijwerken mislukt:", error);
    return serverError("Opslaan in de database mislukt. Probeer het opnieuw.");
  }
}

// PATCH /api/planning/items/:id — eigen aanwezigheid bij een afspraak.
// Body: { person, response: "ja" | "misschien" | "nee" | null }
// Alleen het antwoord van deze persoon wordt aangepast, zodat antwoorden van
// collega's die tegelijk reageren niet worden overschreven.
export async function PATCH(request: Request, { params }: Context) {
  if (!(await hasPlanningAccess())) return unauthorized();

  const _id = toObjectId((await params).id);
  if (!_id) return notFound();

  const { person, response } = ((await readJson(request)) ?? {}) as {
    person?: unknown;
    response?: unknown;
  };
  if (
    !isPlanningPerson(person) ||
    (response !== null && !isAttendanceResponse(response))
  ) {
    return badRequest();
  }
  if (!isDatabaseConfigured()) return databaseUnavailable();

  const field = `responses.${person}`;
  try {
    const result = await (await itemsCollection()).updateOne(
      { _id, kind: "afspraak", people: person },
      response === null
        ? { $unset: { [field]: "" }, $set: { updatedAt: new Date() } }
        : { $set: { [field]: response, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return notFound("Deze afspraak bestaat niet meer of je bent niet uitgenodigd.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Aanwezigheid opslaan mislukt:", error);
    return serverError("Opslaan in de database mislukt. Probeer het opnieuw.");
  }
}

// DELETE /api/planning/items/:id
export async function DELETE(_request: Request, { params }: Context) {
  if (!(await hasPlanningAccess())) return unauthorized();

  const _id = toObjectId((await params).id);
  if (!_id) return notFound();
  if (!isDatabaseConfigured()) return databaseUnavailable();

  try {
    await (await itemsCollection()).deleteOne({ _id });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Planning-item verwijderen mislukt:", error);
    return serverError("Verwijderen uit de database mislukt. Probeer het opnieuw.");
  }
}
