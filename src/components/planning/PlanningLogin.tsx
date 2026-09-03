"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, Lock } from "lucide-react";

export function PlanningLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Wachtwoordmanagers injecteren attributen/nodes in het formulier vóór
  // React hydrateert. Server + eerste client-paint tonen daarom een skeleton;
  // het echte formulier verschijnt pas na mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/planning/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        router.refresh();
        return;
      }
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Inloggen mislukt. Probeer het opnieuw.");
      setBusy(false);
    } catch {
      setError("Er ging iets mis. Controleer je verbinding en probeer opnieuw.");
      setBusy(false);
    }
  }

  if (!mounted) {
    return (
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-steel-200 bg-white px-6 py-16 text-sm text-steel-500 shadow-card">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Laden…
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-steel-200 bg-white p-6 shadow-card sm:p-8">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700">
          <Lock className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="text-lg font-bold text-navy-900">
          Alleen voor het team
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-steel-600">
          Deze pagina is afgeschermd. Vul de toegangscode in om de planning te
          openen.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="planning-code"
              className="mb-1.5 block text-sm font-medium text-navy-900"
            >
              Toegangscode
            </label>
            <input
              id="planning-code"
              type="password"
              autoComplete="current-password"
              // Browser-extensies (wachtwoordmanagers) injecteren attributen
              // vóór React hydrateert; waarschuwing daarover onderdrukken.
              suppressHydrationWarning
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-steel-300 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-100"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            suppressHydrationWarning
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <KeyRound className="h-4 w-4" aria-hidden />
            )}
            {busy ? "Bezig met inloggen…" : "Planning openen"}
          </button>
        </form>
      </div>
    </div>
  );
}
