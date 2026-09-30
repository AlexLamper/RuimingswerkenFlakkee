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
  formatRange,
  startOfWeek,
  weekLabel,
} from "@/lib/planning-dates";
import { PlanningItemCard } from "./PlanningItemCard";

// Klussen- of Afspraken-tab: alle komende items van één soort, per week.
export function PlanningItemList({
  kind,
  items,
  person,
  today,
  onNew,
  onEdit,
  onRespond,
}: {
  kind: PlanningItemKind;
  items: PlanningItem[];
  person: PlanningPerson | null;
  today: string;
  onNew: () => void;
  onEdit: (item: PlanningItem) => void;
  onRespond: (item: PlanningItem, response: AttendanceResponse | null) => void;
}) {
  // Items zijn al op datum gesorteerd; lopende items (gestart vóór deze week)
  // vallen onder "Deze week".
  const thisWeek = startOfWeek(today);
  const weeks: { start: string; items: PlanningItem[] }[] = [];
  for (const item of items) {
    const start =
      item.startDate < thisWeek ? thisWeek : startOfWeek(item.startDate);
    const last = weeks[weeks.length - 1];
    if (last && last.start === start) last.items.push(item);
    else weeks.push({ start, items: [item] });
  }

  const isKlus = kind === "klus";

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onNew}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-steel-300 bg-white px-4 py-3 text-sm font-semibold text-navy-800 transition hover:border-navy-400 hover:bg-navy-50 sm:w-auto"
      >
        <Plus className="h-4 w-4" aria-hidden />
        {isKlus ? "Nieuwe klus" : "Nieuwe afspraak"}
      </button>

      {weeks.length === 0 ? (
        <p className="rounded-xl border border-steel-200 bg-white px-4 py-10 text-center text-sm text-steel-500">
          {isKlus
            ? "Geen komende klussen."
            : "Geen komende afspraken."}
        </p>
      ) : (
        weeks.map((week) => (
          <section key={week.start}>
            <h3 className="mb-2 flex flex-wrap items-baseline gap-x-2 text-sm font-bold uppercase tracking-wide text-navy-900">
              {weekLabel(week.start, today)}
              <span className="text-xs font-medium normal-case tracking-normal text-steel-500">
                {formatRange(week.start, addDays(week.start, 6))}
              </span>
            </h3>
            <div className="space-y-3">
              {week.items.map((item) => (
                <PlanningItemCard
                  key={item.id}
                  item={item}
                  person={person}
                  onEdit={onEdit}
                  onRespond={onRespond}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
