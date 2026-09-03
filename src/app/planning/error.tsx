"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function PlanningError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Zichtbaar in de browserconsole en (op de server) in de Vercel-logs.
    console.error("Planning render error:", error);
  }, [error]);

  return (
    <section className="bg-steel-50">
      <div className="mx-auto max-w-container px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-md rounded-2xl border border-steel-200 bg-white p-6 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="text-lg font-bold text-navy-900">
            Planning kon niet geladen worden
          </h2>
          <p className="mt-1.5 text-sm text-steel-600">
            Er ging iets mis bij het laden van de planning. Probeer het
            opnieuw.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    </section>
  );
}
