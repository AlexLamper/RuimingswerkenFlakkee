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

export default async function PlanningPage() {
  const loggedIn = await hasPlanningAccess();

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
          {loggedIn ? <PlanningAgenda /> : <PlanningLogin />}
        </div>
      </section>
    </>
  );
}
