import { NextResponse } from "next/server";
import { hasPlanningAccess } from "@/lib/planning-auth";
import { getDb, isDatabaseConfigured } from "@/lib/mongodb";
import {
  isAvailabilityStatus,
  isPlanningPerson,
  type AvailabilityStatus,
} from "@/data/planning";

const COLLECTION = "planning_availability";
const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

type AvailabilityDoc = {
  person: string;
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  updatedAt: Date;
};

function unauthorized() {
  return NextResponse.json({ error: "Geen toegang." }, { status: 401 });
}

function databaseUnavailable() {
  return NextResponse.json(
    {
      error:
        "Database is nog niet gekoppeld (MONGODB_URI ontbreekt). Wijzigingen kunnen niet worden opgeslagen.",
    },
    { status: 503 }
  );
}

// GET /api/planning/availability?month=YYYY-MM
export async function GET(request: Request) {
  if (!(await hasPlanningAccess())) return unauthorized();

  const month = new URL(request.url).searchParams.get("month") ?? "";
  if (!MONTH_RE.test(month)) {
    return NextResponse.json(
      { error: "Ongeldige maand, verwacht YYYY-MM." },
      { status: 400 }
    );
  }
  if (!isDatabaseConfigured()) return databaseUnavailable();

  try {
    const db = await getDb();
    const docs = await db
      .collection<AvailabilityDoc>(COLLECTION)
      .find(
        { date: { $gte: `${month}-01`, $lte: `${month}-31` } },
        { projection: { _id: 0, person: 1, date: 1, status: 1 } }
      )
      .toArray();
    return NextResponse.json({ entries: docs });
  } catch (error) {
    console.error("Planning ophalen mislukt:", error);
    return NextResponse.json(
      { error: "Ophalen uit de database mislukt. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}

// PUT /api/planning/availability
// Body: { person, date: "YYYY-MM-DD", status: "beschikbaar" | "niet-beschikbaar" | null }
// status null wist de invulling voor die dag.
export async function PUT(request: Request) {
  if (!(await hasPlanningAccess())) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const { person, date, status } = (body ?? {}) as {
    person?: unknown;
    date?: unknown;
    status?: unknown;
  };

  if (
    !isPlanningPerson(person) ||
    typeof date !== "string" ||
    !DATE_RE.test(date) ||
    (status !== null && !isAvailabilityStatus(status))
  ) {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  // Op zondag wordt nooit gewerkt; die dag staat vast op "niet beschikbaar"
  // en is dus ook via de API niet aan te passen.
  if (new Date(`${date}T00:00:00Z`).getUTCDay() === 0) {
    return NextResponse.json(
      { error: "Op zondag wordt niet gewerkt; deze dag ligt vast." },
      { status: 400 }
    );
  }
  if (!isDatabaseConfigured()) return databaseUnavailable();

  try {
    const collection = (await getDb()).collection<AvailabilityDoc>(COLLECTION);
    if (status === null) {
      await collection.deleteOne({ person, date });
    } else {
      await collection.updateOne(
        { person, date },
        { $set: { status, updatedAt: new Date() } },
        { upsert: true }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Planning opslaan mislukt:", error);
    return NextResponse.json(
      { error: "Opslaan in de database mislukt. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
