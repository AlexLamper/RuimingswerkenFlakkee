import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const PLANNING_COOKIE = "planning_session";
// 30 dagen; daarna moet de code opnieuw ingevoerd worden.
export const PLANNING_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function getPassword(): string | null {
  // Bewust geen fallback: zonder PLANNING_PASSWORD in de omgeving is de
  // pagina dicht (fail closed).
  return process.env.PLANNING_PASSWORD || null;
}

// Het sessietoken is een HMAC afgeleid van het wachtwoord. Wachtwoord
// wijzigen maakt dus meteen alle bestaande sessies ongeldig.
export function sessionToken(): string {
  const password = getPassword();
  if (!password) {
    throw new Error("PLANNING_PASSWORD ontbreekt in de omgeving.");
  }
  return createHmac("sha256", password)
    .update("planning-access-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(input: string): boolean {
  const password = getPassword();
  if (!password) return false;
  return safeEqual(input, password);
}

export async function hasPlanningAccess(): Promise<boolean> {
  if (!getPassword()) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(PLANNING_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, sessionToken());
}
