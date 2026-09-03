import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// TIJDELIJK diagnose-endpoint. Zegt welke commit/omgeving live staat, zodat
// we zeker weten dat pushes naar main ook echt gedeployd worden.
export function GET() {
  return NextResponse.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    commitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE ?? "unknown",
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? "unknown",
    env: process.env.VERCEL_ENV ?? "unknown",
    nodeVersion: process.version,
    hasPlanningPassword: Boolean(process.env.PLANNING_PASSWORD),
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    now: new Date().toISOString(),
  });
}
