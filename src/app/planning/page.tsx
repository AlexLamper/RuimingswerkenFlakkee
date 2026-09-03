import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teamplanning",
  robots: { index: false, follow: false },
};

// TIJDELIJK - bisect stap 2: volledig statische pagina, net als /contact.
// Geen force-dynamic, geen error.tsx, geen auth, geen client components.
export default function PlanningPage() {
  return (
    <section className="bg-steel-50">
      <div className="mx-auto max-w-container px-5 py-16 sm:px-6">
        <h1 className="text-2xl font-bold text-navy-900">
          Teamplanning (diagnose stap 2)
        </h1>
        <p className="mt-3 text-sm text-steel-600">
          Volledig statische render. Als dit laadt, ligt het aan dynamic
          rendering of de error-boundary.
        </p>
      </div>
    </section>
  );
}
