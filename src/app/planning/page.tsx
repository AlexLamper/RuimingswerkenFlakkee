import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teamplanning",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// TIJDELIJK: kale pagina om te bisecteren welk onderdeel de productiecrash
// veroorzaakt. Stap 1 - niets van planning, alleen platte HTML.
export default function PlanningPage() {
  return (
    <section className="bg-steel-50">
      <div className="mx-auto max-w-container px-5 py-16 sm:px-6">
        <h1 className="text-2xl font-bold text-navy-900">
          Teamplanning (diagnose)
        </h1>
        <p className="mt-3 text-sm text-steel-600">
          bisect-stap 1: kale pagina rendert. Timestamp: {Date.now()}
        </p>
      </div>
    </section>
  );
}
