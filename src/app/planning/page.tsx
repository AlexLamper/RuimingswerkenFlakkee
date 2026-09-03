import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PlanningGate } from "@/components/planning/PlanningGate";

export const metadata: Metadata = {
  title: "Teamplanning",
  robots: { index: false, follow: false },
};

// Bewust statisch: de sessiecheck gebeurt client-side via
// /api/planning/session. Een dynamische server-render van deze route gaf op
// Vercel een onherleidbare "Server Components render"-fout.
export default function PlanningPage() {
  return (
    <>
      <PageHeader
        eyebrow="Intern"
        title="Teamplanning"
        intro="Deze pagina is alleen toegankelijk voor teamleden."
      />
      <section className="bg-steel-50">
        <div className="mx-auto max-w-container px-5 py-10 sm:px-6 sm:py-14">
          <PlanningGate />
        </div>
      </section>
    </>
  );
}
