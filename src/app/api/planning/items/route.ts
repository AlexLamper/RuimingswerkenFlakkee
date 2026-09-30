import { NextResponse } from "next/server";
import { hasPlanningAccess } from "@/lib/planning-auth";
import { isDatabaseConfigured } from "@/lib/mongodb";
import {
  DATE_RE,
  badRequest,
  databaseUnavailable,
  serverError,
  unauthorized,
} from "@/lib/planning-api";
import {
  itemsCollection,
  parseItemInput,
  toPlanningItem,
  type PlanningItemDoc,
} from "@/lib/planning-items";

// GET /api/planning/items?from=YYYY-MM-DD
// Alle klussen en afspraken die op of na `from` nog lopen. `from` komt van de
// browser (lokale datum), zodat "vandaag" klopt ongeacht de tijdzone van de
// server.
export async function GET(request: Request) {
  if (!(await hasPlanningAccess())) return unauthorized();

  const from = new URL(request.url).searchParams.get("from") ?? "";
  if (!DATE_RE.test(from)) {
    return badRequest("Ongeldige datum, verwacht YYYY-MM-DD.");
  }
  if (!isDatabaseConfigured()) return databaseUnavailable();

  try {
    const docs = await (await itemsCollection())
      .find({ lastDate: { $gte: from } })
      .sort({ startDate: 1, startTime: 1, title: 1 })
      .toArray();
    return NextResponse.json({ items: docs.map(toPlanningItem) });
  } catch (error) {
    console.error("Planning-items ophalen mislukt:", error);
    return serverError("Ophalen uit de database mislukt. Probeer het opnieuw.");
  }
}

// POST /api/planning/items
// Body: PlanningItemInput (zie src/data/planning.ts).
export async function POST(request: Request) {
  if (!(await hasPlanningAccess())) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest();
  }

  const parsed = parseItemInput(body);
  if (!parsed.ok) return badRequest(parsed.error);
  if (!isDatabaseConfigured()) return databaseUnavailable();

  const { input } = parsed;
  const doc: PlanningItemDoc = {
    ...input,
    responses: {},
    lastDate: input.endDate ?? input.startDate,
    updatedAt: new Date(),
  };
  // Lege optionele velden niet opslaan.
  for (const key of Object.keys(doc) as (keyof PlanningItemDoc)[]) {
    if (doc[key] === undefined) delete doc[key];
  }

  try {
    const result = await (await itemsCollection()).insertOne(doc);
    return NextResponse.json(
      { item: toPlanningItem({ ...doc, _id: result.insertedId }) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Planning-item opslaan mislukt:", error);
    return serverError("Opslaan in de database mislukt. Probeer het opnieuw.");
  }
}
