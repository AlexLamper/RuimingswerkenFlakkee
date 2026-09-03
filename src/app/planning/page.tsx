import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PlanningAgenda } from "@/components/planning/PlanningAgenda";
import { PlanningLogin } from "@/components/planning/PlanningLogin";
import { hasPlanningAccess } from "@/lib/planning-auth";

export const metadata: Metadata = {
  title: "Teamplanning",
  robots: { index: false, follow: false },
};

// Toegang hangt af van de sessiecookie; nooit statisch renderen.
export const dynamic = "force-dynamic";
// Expliciet de Node-runtime: planning-auth gebruikt node:crypto, dat op de
// Edge-runtime niet bestaat.
export const runtime = "nodejs";

export default async function PlanningPage() {
  let loggedIn = false;
  let debugError: string | null = null;
  try {
    loggedIn = await hasPlanningAccess();
  } catch (error) {
    debugError =
      error instanceof Error
        ? `${error.name}: ${error.message}\n${error.stack ?? ""}`
        : String(error);
  }

  return (
    <>
      <PageHeader
        eyebrow="Intern"
        title="Teamplanning"
        intro={
          loggedIn
            ? "Vul in wanneer je beschikbaar bent. Wijzigingen worden direct opgeslagen en zijn voor het hele team zichtbaar."
            : "Deze pagina is alleen toegankelijk voor teamleden."
        }
      />
      <section className="bg-steel-50">
        <div className="mx-auto max-w-container px-5 py-10 sm:px-6 sm:py-14">
          {debugError && (
            <pre className="mb-6 overflow-x-auto rounded-lg border border-red-300 bg-red-50 p-4 text-xs text-red-800">
              {debugError}
            </pre>
          )}
          {loggedIn ? <PlanningAgenda /> : <PlanningLogin />}
        </div>
      </section>
    </>
  );
}
