"use client";

import { Plus } from "lucide-react";
import type {
  AttendanceResponse,
  PlanningItem,
  PlanningItemKind,
  PlanningPerson,
} from "@/data/planning";
import {
  addDays,
  dayLabel,
  daysBetween,
  formatDay,
} from "@/lib/planning-dates";
import { KIND_LOOK, PlanningItemCard } from "./PlanningItemCard";

const OVERVIEW_DAYS = 14;

// Overzicht-tab: alles van de komende twee weken, per dag.
export function PlanningOverview({
  items,
  person,
  today,
  onNew,
  onEdit,
  onRespond,
}: {
  items: PlanningItem[];
  person: PlanningPerson | null;
  today: string;
  onNew: (kind: PlanningItemKind) => void;
  onEdit: (item: PlanningItem) => void;
  onRespond: (item: PlanningItem, response: AttendanceResponse | null) => void;
}) {
  const lastDay = addDays(today, OVERVIEW_DAYS - 1);

  const days: { iso: string; items: PlanningItem[] }[] = [];
  for (let i = 0; i < OVERVIEW_DAYS; i++) {
    const iso = addDays(today, i);
    const onDay = items.filter(
      (item) => item.startDate <= iso && (item.endDate ?? item.startDate) >= iso
    );
    if (onDay.length > 0) days.push({ iso, items: onDay });
  }

  const later = items.filter((item) => item.startDate > lastDay);
  const laterKlussen = later.filter((item) => item.kind === "klus").length;
  const laterAfspraken = later.length - laterKlussen;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:flex">
        {(["klus", "afspraak"] as const).map((kind) => {
          const look = KIND_LOOK[kind];
          return (
            <button
              key={kind}
              type="button"
              onClick={() => onNew(kind)}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-steel-300 bg-white px-4 py-3 text-sm font-semibold text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
            >
              <Plus className="h-4 w-4" aria-hidden />
              <look.Icon className="h-4 w-4" aria-hidden />
              {look.label}
            </button>
          );
        })}
      </div>

      {days.length === 0 ? (
        <p className="rounded-xl border border-steel-200 bg-white px-4 py-10 text-center text-sm text-steel-500">
          Niks gepland de komende 2 weken.
        </p>
      ) : (
        days.map((day) => {
          const label = dayLabel(day.iso, today);
          const isNear = label !== formatDay(day.iso);
          return (
            <section key={day.iso}>
              <h3 className="mb-2 flex items-baseline gap-2">
                <span
                  className={`text-sm font-bold uppercase tracking-wide ${
                    day.iso === today ? "text-navy-900" : "text-navy-800"
                  }`}
                >
                  {label}
                </span>
                {isNear && (
                  <span className="text-xs font-medium text-steel-500">
                    {formatDay(day.iso)}
                  </span>
                )}
              </h3>
              <div className="space-y-3">
                {sortForDay(day.items, day.iso).map((item) => {
                  const total = item.endDate
                    ? daysBetween(item.startDate, item.endDate) + 1
                    : 1;
                  const dayNote =
                    total > 1
                      ? `dag ${daysBetween(item.startDate, day.iso) + 1} van ${total}`
                      : undefined;
                  return (
                    <PlanningItemCard
                      key={item.id}
                      item={item}
                      person={person}
                      onEdit={onEdit}
                      onRespond={onRespond}
                      dayNote={dayNote}
                      showDate={false}
                    />
                  );
                })}
              </div>
            </section>
          );
        })
      )}

      {later.length > 0 && (
        <p className="text-center text-sm text-steel-500">
          Verder vooruit:{" "}
          {[
            laterKlussen > 0 &&
              `${laterKlussen} ${laterKlussen === 1 ? "klus" : "klussen"}`,
            laterAfspraken > 0 &&
              `${laterAfspraken} ${laterAfspraken === 1 ? "afspraak" : "afspraken"}`,
          ]
            .filter(Boolean)
            .join(" en ")}{" "}
          — zie de tabjes Klussen en Afspraken.
        </p>
      )}
    </div>
  );
}

// Binnen een dag op tijd; items zonder tijd (hele dag) bovenaan.
function sortForDay(items: PlanningItem[], iso: string): PlanningItem[] {
  const timeOn = (item: PlanningItem) =>
    item.startDate === iso ? (item.startTime ?? "") : "";
  return [...items].sort((a, b) => timeOn(a).localeCompare(timeOn(b)));
}
