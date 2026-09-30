"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarCheck,
  Check,
  LayoutList,
  Loader2,
  LogOut,
  Truck,
  Users,
} from "lucide-react";
import {
  planningPeople,
  type AttendanceResponse,
  type PlanningItem,
  type PlanningPerson,
} from "@/data/planning";
import { todayIso } from "@/lib/planning-dates";
import { usePlanningItems } from "./usePlanningItems";
import { PlanningOverview } from "./PlanningOverview";
import { PlanningItemList } from "./PlanningItemList";
import { PlanningItemDialog, type DialogTarget } from "./PlanningItemDialog";
import { PlanningAgenda } from "./PlanningAgenda";

const PERSON_STORAGE_KEY = "planning_person";

const TABS = [
  { id: "overzicht", label: "Overzicht", Icon: LayoutList },
  { id: "klussen", label: "Klussen", Icon: Truck },
  { id: "afspraken", label: "Afspraken", Icon: Users },
  { id: "beschikbaarheid", label: "Beschikbaarheid", Icon: CalendarCheck },
] as const;

type TabId = (typeof TABS)[number]["id"];

function tabFromHash(): TabId {
  const hash = window.location.hash.slice(1);
  return TABS.some((tab) => tab.id === hash) ? (hash as TabId) : "overzicht";
}

export function PlanningShell({ onLoggedOut }: { onLoggedOut: () => void }) {
  const [person, setPerson] = useState<PlanningPerson | null>(null);
  const [tab, setTab] = useState<TabId>("overzicht");
  const [onlyMine, setOnlyMine] = useState(false);
  const [dialog, setDialog] = useState<DialogTarget | null>(null);
  const planning = usePlanningItems(onLoggedOut);
  const today = todayIso();

  // Naamkeuze onthouden op dit apparaat.
  useEffect(() => {
    const stored = window.localStorage.getItem(PERSON_STORAGE_KEY);
    if (stored && (planningPeople as readonly string[]).includes(stored)) {
      setPerson(stored as PlanningPerson);
    }
  }, []);

  // Actieve tab in de URL-hash, zodat een link of refresh op dezelfde tab
  // uitkomt.
  useEffect(() => {
    setTab(tabFromHash());
    const onHashChange = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function choosePerson(name: PlanningPerson) {
    setPerson(name);
    window.localStorage.setItem(PERSON_STORAGE_KEY, name);
  }

  function chooseTab(id: TabId) {
    setTab(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  async function handleLogout() {
    await fetch("/api/planning/logout", { method: "POST" });
    onLoggedOut();
  }

  // Voorbije items kunnen nog in de lijst staan als de pagina over middernacht
  // open bleef; die filteren we hier ook weg.
  const visible = useMemo(
    () =>
      planning.items.filter(
        (item) =>
          (item.endDate ?? item.startDate) >= today &&
          (!onlyMine || (person !== null && item.people.includes(person)))
      ),
    [planning.items, today, onlyMine, person]
  );
  const klussen = visible.filter((item) => item.kind === "klus");
  const afspraken = visible.filter((item) => item.kind === "afspraak");
  const openForMe = person
    ? afspraken.filter(
        (item) => item.people.includes(person) && !item.responses[person]
      ).length
    : 0;

  function handleRespond(
    item: PlanningItem,
    response: AttendanceResponse | null
  ) {
    if (person) void planning.respond(item.id, person, response);
  }

  const counts: Partial<Record<TabId, number>> = {
    klussen: klussen.length,
    afspraken: afspraken.length,
  };

  const listProps = {
    person,
    today,
    onEdit: (item: PlanningItem) => setDialog({ mode: "edit", item }),
    onRespond: handleRespond,
  };

  return (
    <>
      <div className="space-y-5">
        {/* Naamkeuze + uitloggen */}
        <div className="rounded-2xl border border-steel-200 bg-white p-4 shadow-card sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-navy-900">Wie ben jij?</p>
              <p className="mt-0.5 text-xs text-steel-500">
                Nodig om je beschikbaarheid in te vullen en op afspraken te
                reageren.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-steel-300 bg-white px-3 py-1.5 text-sm font-medium text-steel-700 transition hover:border-navy-400 hover:text-navy-800"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Uitloggen
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {planningPeople.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => choosePerson(name)}
                aria-pressed={person === name}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  person === name
                    ? "border-navy-800 bg-navy-800 text-white"
                    : "border-steel-300 bg-white text-steel-700 hover:border-navy-400 hover:text-navy-800"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Tabjes: 2×2 op mobiel, op een rij vanaf sm */}
        <div
          role="tablist"
          aria-label="Planning"
          className="grid grid-cols-2 gap-1 rounded-xl border border-steel-200 bg-white p-1 shadow-card sm:inline-flex"
        >
          {TABS.map(({ id, label, Icon }) => {
            const active = tab === id;
            const count = counts[id];
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={active}
                aria-controls="planning-tabpanel"
                onClick={() => chooseTab(id)}
                className={`relative flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-semibold transition sm:py-2 ${
                  active
                    ? "bg-navy-800 text-white"
                    : "text-steel-600 hover:bg-steel-100 hover:text-navy-800"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
                {count !== undefined && count > 0 && (
                  <span
                    className={`rounded-full px-1.5 text-xs ${
                      active ? "bg-white/20" : "bg-steel-100 text-steel-600"
                    }`}
                  >
                    {count}
                  </span>
                )}
                {id === "afspraken" && openForMe > 0 && (
                  <span
                    className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
                    aria-label={`${openForMe} afspraken wachten op jouw antwoord`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {tab !== "beschikbaarheid" && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label
              className={`flex items-center gap-2 text-sm font-medium ${
                person ? "text-navy-900" : "text-steel-400"
              }`}
            >
              <input
                type="checkbox"
                checked={onlyMine && person !== null}
                disabled={!person}
                onChange={(e) => setOnlyMine(e.target.checked)}
                className="h-4 w-4 accent-navy-800"
              />
              Alleen waar ik bij ben
            </label>
            <span
              aria-live="polite"
              className="flex items-center gap-1.5 text-xs font-medium text-steel-500"
            >
              {planning.saveState === "saving" && (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  Opslaan…
                </>
              )}
              {planning.saveState === "saved" && (
                <>
                  <Check
                    className="h-3.5 w-3.5 text-emerald-600"
                    aria-hidden
                  />
                  Opgeslagen
                </>
              )}
            </span>
          </div>
        )}

        {tab !== "beschikbaarheid" && planning.error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{planning.error}</span>
          </div>
        )}

        {tab === "afspraken" && !person && afspraken.length > 0 && (
          <div className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-800">
            Kies eerst wie je bent om aan te geven of je bij een afspraak kunt
            zijn.
          </div>
        )}

        <div
          id="planning-tabpanel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "beschikbaarheid" ? (
            <PlanningAgenda person={person} onLoggedOut={onLoggedOut} />
          ) : planning.loading ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-steel-200 bg-white px-4 py-16 text-sm text-steel-500 shadow-card">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Planning laden…
            </div>
          ) : tab === "overzicht" ? (
            <PlanningOverview
              {...listProps}
              items={visible}
              onNew={(kind) => setDialog({ mode: "new", kind })}
            />
          ) : tab === "klussen" ? (
            <PlanningItemList
              {...listProps}
              kind="klus"
              items={klussen}
              onNew={() => setDialog({ mode: "new", kind: "klus" })}
            />
          ) : (
            <PlanningItemList
              {...listProps}
              kind="afspraak"
              items={afspraken}
              onNew={() => setDialog({ mode: "new", kind: "afspraak" })}
            />
          )}
        </div>
      </div>

      {/* Buiten de space-y-container, anders krijgt de dialoog een marge. */}
      {dialog && (
        <PlanningItemDialog
          key={dialog.mode === "edit" ? dialog.item.id : `new-${dialog.kind}`}
          target={dialog}
          person={person}
          onClose={() => setDialog(null)}
          onSave={(input) =>
            dialog.mode === "edit"
              ? planning.update(dialog.item.id, input)
              : planning.create(input)
          }
          onDelete={() =>
            dialog.mode === "edit"
              ? planning.remove(dialog.item.id)
              : Promise.resolve({ ok: true as const })
          }
        />
      )}
    </>
  );
}
