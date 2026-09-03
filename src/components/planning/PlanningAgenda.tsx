"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  Sunrise,
  Sunset,
  X,
} from "lucide-react";
import {
  planningPeople,
  type AvailabilityStatus,
  type PlanningPerson,
} from "@/data/planning";

const MONTH_NAMES = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const WEEKDAY_SHORT = ["zo", "ma", "di", "wo", "do", "vr", "za"];

const PERSON_STORAGE_KEY = "planning_person";

type Entry = {
  person: PlanningPerson;
  date: string;
  status: AvailabilityStatus;
};

type SaveState = "idle" | "saving" | "saved" | "error";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function monthKey(year: number, month: number): string {
  return `${year}-${pad(month + 1)}`;
}

function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// Cyclus bij klikken:
// leeg → beschikbaar → alleen ochtend → alleen avond → niet beschikbaar → leeg.
function nextStatus(
  current: AvailabilityStatus | undefined
): AvailabilityStatus | null {
  switch (current) {
    case undefined:
      return "beschikbaar";
    case "beschikbaar":
      return "ochtend";
    case "ochtend":
      return "avond";
    case "avond":
      return "niet-beschikbaar";
    default:
      return null;
  }
}

// Kleur per status voor de cel in de agenda.
function statusLook(status: AvailabilityStatus | undefined): string {
  switch (status) {
    case "beschikbaar":
      return "bg-emerald-100 text-emerald-700";
    case "ochtend":
      return "bg-amber-100 text-amber-700";
    case "avond":
      return "bg-violet-100 text-violet-700";
    case "niet-beschikbaar":
      return "bg-red-100 text-red-600";
    default:
      return "bg-steel-100 text-steel-300";
  }
}

// Korte tekstuele omschrijving, gebruikt in aria-labels.
function statusText(status: AvailabilityStatus | undefined): string {
  switch (status) {
    case "beschikbaar":
      return "beschikbaar";
    case "ochtend":
      return "alleen 's ochtends beschikbaar";
    case "avond":
      return "alleen 's avonds beschikbaar";
    case "niet-beschikbaar":
      return "niet beschikbaar";
    default:
      return "nog niet ingevuld";
  }
}

// Icoon in de cel; null wanneer de dag nog niet is ingevuld (dan tonen we "·").
function StatusIcon({ status }: { status: AvailabilityStatus | undefined }) {
  switch (status) {
    case "beschikbaar":
      return <Check className="h-4 w-4" aria-hidden />;
    case "ochtend":
      return <Sunrise className="h-4 w-4" aria-hidden />;
    case "avond":
      return <Sunset className="h-4 w-4" aria-hidden />;
    case "niet-beschikbaar":
      return <X className="h-4 w-4" aria-hidden />;
    default:
      return <span aria-hidden>·</span>;
  }
}

export function PlanningAgenda() {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-11
  const [entries, setEntries] = useState<Map<string, AvailabilityStatus>>(
    new Map()
  );
  const [person, setPerson] = useState<PlanningPerson | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const pendingSaves = useRef(0);
  const savedResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentMonth = monthKey(year, month);
  const today = todayIso();

  // Naamkeuze onthouden op dit apparaat.
  useEffect(() => {
    const stored = window.localStorage.getItem(PERSON_STORAGE_KEY);
    if (stored && (planningPeople as readonly string[]).includes(stored)) {
      setPerson(stored as PlanningPerson);
    }
  }, []);

  function choosePerson(name: PlanningPerson) {
    setPerson(name);
    window.localStorage.setItem(PERSON_STORAGE_KEY, name);
  }

  const loadMonth = useCallback(async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/planning/availability?month=${key}`,
        { cache: "no-store" }
      );
      if (response.status === 401) {
        router.refresh();
        return;
      }
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error ?? "Planning laden mislukt.");
        return;
      }
      const map = new Map<string, AvailabilityStatus>();
      for (const entry of (data?.entries ?? []) as Entry[]) {
        map.set(`${entry.person}|${entry.date}`, entry.status);
      }
      setEntries(map);
    } catch {
      setError("Planning laden mislukt. Controleer je verbinding.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadMonth(currentMonth);
  }, [currentMonth, loadMonth]);

  function shiftMonth(delta: number) {
    const date = new Date(year, month + delta, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function goToToday() {
    const date = new Date();
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  async function toggleCell(date: string) {
    if (!person) return;
    const key = `${person}|${date}`;
    const previous = entries.get(key);
    const next = nextStatus(previous);

    // Optimistisch bijwerken; bij een fout draaien we terug.
    setEntries((current) => {
      const map = new Map(current);
      if (next === null) map.delete(key);
      else map.set(key, next);
      return map;
    });

    pendingSaves.current += 1;
    setSaveState("saving");
    if (savedResetTimer.current) clearTimeout(savedResetTimer.current);

    let failed = false;
    try {
      const response = await fetch("/api/planning/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, date, status: next }),
      });
      if (response.status === 401) {
        router.refresh();
        return;
      }
      if (!response.ok) {
        failed = true;
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Opslaan mislukt. Probeer het opnieuw.");
      }
    } catch {
      failed = true;
      setError("Opslaan mislukt. Controleer je verbinding.");
    }

    pendingSaves.current -= 1;
    if (failed) {
      setEntries((current) => {
        const map = new Map(current);
        if (previous === undefined) map.delete(key);
        else map.set(key, previous);
        return map;
      });
      setSaveState("error");
      return;
    }

    setError(null);
    if (pendingSaves.current === 0) {
      setSaveState("saved");
      savedResetTimer.current = setTimeout(() => setSaveState("idle"), 2500);
    }
  }

  async function handleLogout() {
    await fetch("/api/planning/logout", { method: "POST" });
    router.refresh();
  }

  // Eigen kolom vooraan zodat je op mobiel niet hoeft te scrollen om je
  // eigen beschikbaarheid in te vullen.
  const orderedPeople = useMemo(
    () =>
      person
        ? [person, ...planningPeople.filter((name) => name !== person)]
        : [...planningPeople],
    [person]
  );

  const days = useMemo(() => {
    const count = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => {
      const dayNumber = i + 1;
      const date = new Date(year, month, dayNumber);
      return {
        iso: `${currentMonth}-${pad(dayNumber)}`,
        dayNumber,
        weekday: WEEKDAY_SHORT[date.getDay()],
        // Op zondag wordt nooit gewerkt: staat vast op "niet beschikbaar".
        // Zaterdag is een gewone werkdag en krijgt geen aparte opmaak.
        isSunday: date.getDay() === 0,
      };
    });
  }, [year, month, currentMonth]);

  return (
    <div className="space-y-5">
      {/* Naamkeuze */}
      <div className="rounded-2xl border border-steel-200 bg-white p-4 shadow-card sm:p-5">
        <p className="text-sm font-semibold text-navy-900">Wie ben jij?</p>
        <p className="mt-0.5 text-xs text-steel-500">
          Kies je naam; jouw kolom komt dan vooraan te staan en kun je invullen
          door op een dag te tikken.
        </p>
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

      {/* Maandnavigatie + status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Vorige maand"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-steel-300 bg-white text-steel-600 transition hover:border-navy-400 hover:text-navy-800"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <h2 className="min-w-[11rem] text-center text-base font-bold capitalize text-navy-900 sm:text-lg">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Volgende maand"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-steel-300 bg-white text-steel-600 transition hover:border-navy-400 hover:text-navy-800"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goToToday}
            className="ml-1 rounded-lg border border-steel-300 bg-white px-3 py-1.5 text-sm font-medium text-steel-700 transition hover:border-navy-400 hover:text-navy-800"
          >
            Vandaag
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span
            aria-live="polite"
            className="flex items-center gap-1.5 text-xs font-medium text-steel-500"
          >
            {saveState === "saving" && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                Opslaan…
              </>
            )}
            {saveState === "saved" && (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                Opgeslagen
              </>
            )}
            {saveState === "error" && (
              <>
                <AlertTriangle
                  className="h-3.5 w-3.5 text-red-600"
                  aria-hidden
                />
                Niet opgeslagen
              </>
            )}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-steel-300 bg-white px-3 py-1.5 text-sm font-medium text-steel-700 transition hover:border-navy-400 hover:text-navy-800"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Uitloggen
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {!person && (
        <div className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-800">
          Kies eerst je naam hierboven om je beschikbaarheid in te vullen. Je
          kunt de planning van iedereen wel bekijken.
        </div>
      )}

      {/* Agenda-tabel */}
      <div className="overflow-hidden rounded-2xl border border-steel-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-steel-200 bg-steel-50">
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-28 bg-steel-50 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-steel-500"
                >
                  Datum
                </th>
                {orderedPeople.map((name) => (
                  <th
                    key={name}
                    scope="col"
                    className={`px-2 py-2.5 text-center text-xs font-semibold ${
                      person === name
                        ? "bg-navy-800 text-white"
                        : "text-navy-900"
                    }`}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const isToday = day.iso === today;
                return (
                  <tr
                    key={day.iso}
                    className={`border-b border-steel-100 last:border-b-0 ${
                      day.isSunday ? "bg-steel-50/70" : "bg-white"
                    }`}
                  >
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 whitespace-nowrap px-3 py-1.5 text-left font-medium ${
                        day.isSunday ? "bg-steel-50" : "bg-white"
                      } ${isToday ? "text-navy-900" : "text-steel-600"}`}
                    >
                      <span className="capitalize">{day.weekday}</span>{" "}
                      {day.dayNumber}
                      {isToday && (
                        <span className="ml-1.5 rounded-full bg-navy-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          vandaag
                        </span>
                      )}
                    </th>
                    {orderedPeople.map((name) => {
                      if (day.isSunday) {
                        return (
                          <td key={name} className="px-2 py-1.5 text-center">
                            <span
                              aria-label={`${name}, zondag ${day.dayNumber}: niet beschikbaar (op zondag wordt niet gewerkt)`}
                              className="mx-auto flex h-9 w-11 items-center justify-center rounded-md bg-red-50 text-red-300 sm:h-7 sm:w-9"
                            >
                              <X className="h-4 w-4" aria-hidden />
                            </span>
                          </td>
                        );
                      }
                      const status = entries.get(`${name}|${day.iso}`);
                      const isOwn = person === name;
                      const base =
                        "mx-auto flex h-9 w-11 items-center justify-center rounded-md text-xs font-bold transition sm:h-7 sm:w-9";
                      const look = statusLook(status);
                      return (
                        <td key={name} className="px-2 py-1.5 text-center">
                          {isOwn ? (
                            <button
                              type="button"
                              onClick={() => toggleCell(day.iso)}
                              disabled={loading}
                              aria-label={`${name}, ${day.weekday} ${day.dayNumber}: ${statusText(
                                status
                              )}. Klik om te wijzigen.`}
                              className={`${base} ${look} ring-1 ring-inset ${
                                status
                                  ? "ring-transparent"
                                  : "ring-steel-200"
                              } hover:ring-navy-400 disabled:cursor-wait`}
                            >
                              <StatusIcon status={status} />
                            </button>
                          ) : (
                            <span
                              className={`${base} ${look}`}
                              aria-label={`${name}, ${day.weekday} ${day.dayNumber}: ${statusText(
                                status
                              )}`}
                            >
                              <StatusIcon status={status} />
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="flex items-center justify-center gap-2 border-t border-steel-100 px-4 py-3 text-sm text-steel-500">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Planning laden…
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-steel-600">
        <span className="flex items-center gap-1.5">
          <span className="flex h-5 w-6 items-center justify-center rounded bg-emerald-100 text-emerald-700">
            <Check className="h-3 w-3" aria-hidden />
          </span>
          Hele dag beschikbaar
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex h-5 w-6 items-center justify-center rounded bg-amber-100 text-amber-700">
            <Sunrise className="h-3 w-3" aria-hidden />
          </span>
          Alleen ochtend
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex h-5 w-6 items-center justify-center rounded bg-violet-100 text-violet-700">
            <Sunset className="h-3 w-3" aria-hidden />
          </span>
          Alleen avond
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex h-5 w-6 items-center justify-center rounded bg-red-100 text-red-600">
            <X className="h-3 w-3" aria-hidden />
          </span>
          Niet beschikbaar
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex h-5 w-6 items-center justify-center rounded bg-steel-100 text-steel-400">
            ·
          </span>
          Nog niet ingevuld
        </span>
        <span className="text-steel-400">
          Klik in je eigen kolom om te wisselen; wijzigingen worden direct
          opgeslagen. Zondag staat vast op niet beschikbaar.
        </span>
      </div>
    </div>
  );
}
