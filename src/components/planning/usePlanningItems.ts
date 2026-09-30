"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AttendanceResponse,
  PlanningItem,
  PlanningItemInput,
  PlanningPerson,
} from "@/data/planning";
import { todayIso } from "@/lib/planning-dates";

export type SaveState = "idle" | "saving" | "saved" | "error";

// Uitkomst van een actie vanuit het formulier: bij een fout de melding.
export type ActionResult = { ok: true } | { ok: false; error: string };

function sortItems(items: PlanningItem[]): PlanningItem[] {
  return [...items].sort(
    (a, b) =>
      a.startDate.localeCompare(b.startDate) ||
      (a.startTime ?? "").localeCompare(b.startTime ?? "") ||
      a.title.localeCompare(b.title)
  );
}

// Laadt en bewaart alle komende klussen en afspraken. Wordt één keer in de
// shell gebruikt en doorgegeven aan de tabs, zodat wisselen van tab niet
// opnieuw laadt.
export function usePlanningItems(onLoggedOut: () => void) {
  const [items, setItems] = useState<PlanningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const savedResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(
    async (quiet = false) => {
      if (!quiet) setLoading(true);
      try {
        const response = await fetch(
          `/api/planning/items?from=${todayIso()}`,
          { cache: "no-store" }
        );
        if (response.status === 401) {
          onLoggedOut();
          return;
        }
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          setError(data?.error ?? "Planning laden mislukt.");
          return;
        }
        setItems(sortItems((data?.items ?? []) as PlanningItem[]));
        setError(null);
      } catch {
        if (!quiet) setError("Planning laden mislukt. Controleer je verbinding.");
      } finally {
        setLoading(false);
      }
    },
    [onLoggedOut]
  );

  useEffect(() => {
    void load();
    // Wijzigingen van collega's ophalen zodra je terugkomt in het venster.
    const onFocus = () => void load(true);
    const onVisible = () => {
      if (document.visibilityState === "visible") onFocus();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  function markSaved() {
    setError(null);
    setSaveState("saved");
    if (savedResetTimer.current) clearTimeout(savedResetTimer.current);
    savedResetTimer.current = setTimeout(() => setSaveState("idle"), 2500);
  }

  // Voert een verzoek uit en vertaalt 401/fouten naar een ActionResult.
  const send = useCallback(
    async (
      url: string,
      init: RequestInit
    ): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> => {
      setSaveState("saving");
      try {
        const response = await fetch(url, {
          ...init,
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 401) {
          onLoggedOut();
          return { ok: false, error: "Je bent uitgelogd." };
        }
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          setSaveState("error");
          return {
            ok: false,
            error: data?.error ?? "Opslaan mislukt. Probeer het opnieuw.",
          };
        }
        return { ok: true, data };
      } catch {
        setSaveState("error");
        return { ok: false, error: "Opslaan mislukt. Controleer je verbinding." };
      }
    },
    [onLoggedOut]
  );

  async function create(input: PlanningItemInput): Promise<ActionResult> {
    const result = await send("/api/planning/items", {
      method: "POST",
      body: JSON.stringify(input),
    });
    if (!result.ok) return result;
    const item = (result.data as { item: PlanningItem }).item;
    setItems((current) => sortItems([...current, item]));
    markSaved();
    return { ok: true };
  }

  async function update(
    id: string,
    input: PlanningItemInput
  ): Promise<ActionResult> {
    const result = await send(`/api/planning/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
    if (!result.ok) return result;
    const item = (result.data as { item: PlanningItem }).item;
    setItems((current) =>
      sortItems(current.map((existing) => (existing.id === id ? item : existing)))
    );
    markSaved();
    return { ok: true };
  }

  async function remove(id: string): Promise<ActionResult> {
    const result = await send(`/api/planning/items/${id}`, {
      method: "DELETE",
    });
    if (!result.ok) return result;
    setItems((current) => current.filter((item) => item.id !== id));
    markSaved();
    return { ok: true };
  }

  // Eigen aanwezigheid bij een afspraak; optimistisch, bij een fout terug.
  async function respond(
    id: string,
    person: PlanningPerson,
    response: AttendanceResponse | null
  ) {
    const previous = items.find((item) => item.id === id)?.responses[person];
    const apply = (value: AttendanceResponse | undefined) =>
      setItems((current) =>
        current.map((item) => {
          if (item.id !== id) return item;
          const responses = { ...item.responses };
          if (value) responses[person] = value;
          else delete responses[person];
          return { ...item, responses };
        })
      );

    apply(response ?? undefined);
    const result = await send(`/api/planning/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ person, response }),
    });
    if (!result.ok) {
      apply(previous);
      setError(result.error);
      return;
    }
    markSaved();
  }

  return {
    items,
    loading,
    error,
    saveState,
    reload: load,
    create,
    update,
    remove,
    respond,
  };
}

export type PlanningItemsApi = ReturnType<typeof usePlanningItems>;
