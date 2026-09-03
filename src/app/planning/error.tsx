"use client";

// Tijdelijke foutgrens om de echte oorzaak van de productiecrash op /planning
// zichtbaar te maken. Weghalen zodra de bug gevonden is.
export default function PlanningError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-steel-50">
      <div className="mx-auto max-w-container px-5 py-10 sm:px-6 sm:py-14">
        <div className="rounded-lg border border-red-300 bg-red-50 p-5 text-sm text-red-900">
          <p className="font-semibold">Planning kon niet geladen worden.</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs">
            name: {error.name}
            {"\n"}message: {error.message}
            {"\n"}digest: {error.digest ?? "-"}
            {"\n"}stack: {error.stack ?? "-"}
          </pre>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-md bg-navy-800 px-4 py-2 text-xs font-semibold text-white"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    </section>
  );
}
