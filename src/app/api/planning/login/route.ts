import { NextResponse } from "next/server";
import {
  PLANNING_COOKIE,
  PLANNING_COOKIE_MAX_AGE,
  sessionToken,
  verifyPassword,
} from "@/lib/planning-auth";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // Ongeldige JSON valt door naar de foutmelding hieronder.
  }

  if (!password || !verifyPassword(password)) {
    // Kleine vertraging maakt brute-forcen onaantrekkelijk.
    await new Promise((resolve) => setTimeout(resolve, 750));
    return NextResponse.json(
      { error: "Onjuiste toegangscode." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(PLANNING_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PLANNING_COOKIE_MAX_AGE,
  });
  return response;
}
