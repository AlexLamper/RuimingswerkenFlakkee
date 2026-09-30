import { NextResponse } from "next/server";

// Gedeelde antwoorden en patronen voor de /api/planning-routes.

export const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export function unauthorized() {
  return NextResponse.json({ error: "Geen toegang." }, { status: 401 });
}

export function badRequest(error = "Ongeldige aanvraag.") {
  return NextResponse.json({ error }, { status: 400 });
}

export function notFound(error = "Niet gevonden.") {
  return NextResponse.json({ error }, { status: 404 });
}

export function databaseUnavailable() {
  return NextResponse.json(
    {
      error:
        "Database is nog niet gekoppeld (MONGODB_URI ontbreekt). Wijzigingen kunnen niet worden opgeslagen.",
    },
    { status: 503 }
  );
}

export function serverError(error: string) {
  return NextResponse.json({ error }, { status: 500 });
}
