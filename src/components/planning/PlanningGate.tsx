"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PlanningShell } from "./PlanningShell";
import { PlanningLogin } from "./PlanningLogin";

type GateState = "loading" | "in" | "out";

export function PlanningGate() {
  const [state, setState] = useState<GateState>("loading");

  const check = useCallback(async () => {
    try {
      const res = await fetch("/api/planning/session", { cache: "no-store" });
      const data = (await res.json().catch(() => null)) as {
        loggedIn?: boolean;
      } | null;
      setState(data?.loggedIn ? "in" : "out");
    } catch {
      setState("out");
    }
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  const handleLoggedOut = useCallback(() => setState("out"), []);
  const handleSuccess = useCallback(() => setState("in"), []);

  if (state === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-steel-200 bg-white px-4 py-16 text-sm text-steel-500 shadow-card">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Laden…
      </div>
    );
  }

  return state === "in" ? (
    <PlanningShell onLoggedOut={handleLoggedOut} />
  ) : (
    <PlanningLogin onSuccess={handleSuccess} />
  );
}
