import { NextResponse } from "next/server";
import { hasPlanningAccess } from "@/lib/planning-auth";

// Sessiecheck voor de client. De /planning-pagina zelf blijft statisch;
// het inlog-gedeelte vraagt deze route op bij het laden.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ loggedIn: await hasPlanningAccess() });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
