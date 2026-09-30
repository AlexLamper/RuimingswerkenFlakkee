"use client";

import {
  CalendarDays,
  Check,
  Clock,
  HelpCircle,
  MapPin,
  Pencil,
  Truck,
  User,
  Users,
  X,
} from "lucide-react";
import type {
  AttendanceResponse,
  PlanningItem,
  PlanningPerson,
} from "@/data/planning";
import { formatRange, formatTime } from "@/lib/planning-dates";

// Vaste kleuren per soort, zodat klus en afspraak in één oogopslag te
// onderscheiden zijn.
export const KIND_LOOK = {
  klus: {
    label: "Klus",
    Icon: Truck,
    bar: "border-l-navy-700",
    badge: "bg-navy-100 text-navy-800",
  },
  afspraak: {
    label: "Afspraak",
    Icon: Users,
    bar: "border-l-violet-500",
    badge: "bg-violet-100 text-violet-800",
  },
} as const;

const RESPONSE_LOOK: Record<
  AttendanceResponse | "open",
  { label: string; pill: string; Icon: typeof Check | null }
> = {
  ja: { label: "Ja", pill: "bg-emerald-100 text-emerald-800", Icon: Check },
  misschien: {
    label: "Misschien",
    pill: "bg-amber-100 text-amber-800",
    Icon: HelpCircle,
  },
  nee: { label: "Nee", pill: "bg-red-100 text-red-700", Icon: X },
  open: { label: "Nog niet", pill: "bg-steel-100 text-steel-500", Icon: null },
};

const RESPONSE_BUTTONS: {
  value: AttendanceResponse;
  label: string;
  active: string;
}[] = [
  { value: "ja", label: "Ja", active: "border-emerald-600 bg-emerald-600 text-white" },
  {
    value: "misschien",
    label: "Misschien",
    active: "border-amber-500 bg-amber-500 text-white",
  },
  { value: "nee", label: "Nee", active: "border-red-600 bg-red-600 text-white" },
];

function mapsUrl(location: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;
}

export function PlanningItemCard({
  item,
  person,
  onEdit,
  onRespond,
  dayNote,
  showDate = true,
}: {
  item: PlanningItem;
  person: PlanningPerson | null;
  onEdit: (item: PlanningItem) => void;
  onRespond: (
    item: PlanningItem,
    response: AttendanceResponse | null
  ) => void;
  // Bijv. "dag 2 van 3" in het dagoverzicht.
  dayNote?: string;
  showDate?: boolean;
}) {
  const look = KIND_LOOK[item.kind];
  const time = formatTime(item.startTime, item.endTime);
  const isInvited = person !== null && item.people.includes(person);
  const ownResponse = person ? item.responses[person] : undefined;

  const counts = { ja: 0, misschien: 0, nee: 0, open: 0 };
  for (const name of item.people) counts[item.responses[name] ?? "open"] += 1;

  return (
    <article
      className={`rounded-xl border border-l-4 border-steel-200 bg-white p-4 shadow-card ${look.bar}`}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${look.badge}`}
            >
              <look.Icon className="h-3 w-3" aria-hidden />
              {look.label}
            </span>
            {dayNote && (
              <span className="text-xs font-medium text-steel-500">
                {dayNote}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-base font-bold leading-snug text-navy-900">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="text-left hover:underline"
            >
              {item.title}
            </button>
          </h3>

          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-steel-600">
            {showDate && (
              <span className="flex items-center gap-1.5 font-medium text-navy-800">
                <CalendarDays className="h-4 w-4 text-steel-400" aria-hidden />
                {formatRange(item.startDate, item.endDate)}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1.5 font-medium text-navy-800">
                <Clock className="h-4 w-4 text-steel-400" aria-hidden />
                {time}
              </span>
            )}
            {item.client && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-steel-400" aria-hidden />
                {item.client}
              </span>
            )}
            {item.location && (
              <a
                href={mapsUrl(item.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 underline-offset-2 hover:text-navy-800 hover:underline"
              >
                <MapPin className="h-4 w-4 text-steel-400" aria-hidden />
                {item.location}
              </a>
            )}
          </div>

          {item.notes && (
            <p className="mt-2 line-clamp-2 whitespace-pre-line text-sm text-steel-500">
              {item.notes}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onEdit(item)}
          aria-label={`${item.title} aanpassen`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-steel-200 text-steel-500 transition hover:border-navy-400 hover:text-navy-800"
        >
          <Pencil className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Wie */}
      {item.kind === "klus" ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.people.length === 0 ? (
            <span className="text-xs font-medium text-amber-700">
              Nog niemand ingedeeld
            </span>
          ) : (
            item.people.map((name) => (
              <span
                key={name}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  name === person
                    ? "bg-navy-800 text-white"
                    : "bg-steel-100 text-navy-900"
                }`}
              >
                {name}
              </span>
            ))
          )}
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {item.people.map((name) => {
              const response = item.responses[name] ?? "open";
              const r = RESPONSE_LOOK[response];
              return (
                <span
                  key={name}
                  title={`${name}: ${r.label.toLowerCase()}`}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.pill} ${
                    name === person ? "ring-2 ring-navy-800 ring-offset-1" : ""
                  }`}
                >
                  {r.Icon && <r.Icon className="h-3 w-3" aria-hidden />}
                  {name}
                </span>
              );
            })}
          </div>
          <p className="text-xs text-steel-500">
            {counts.ja} ja · {counts.misschien} misschien · {counts.nee} nee
            {counts.open > 0 && ` · ${counts.open} nog niet`}
          </p>

          {isInvited && (
            <div className="flex flex-wrap items-center gap-2 border-t border-steel-100 pt-3">
              <span className="text-sm font-medium text-navy-900">
                Ben jij erbij?
              </span>
              <div className="flex gap-1.5">
                {RESPONSE_BUTTONS.map((option) => {
                  const active = ownResponse === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        onRespond(item, active ? null : option.value)
                      }
                      className={`rounded-lg border px-3.5 py-1.5 text-sm font-semibold transition ${
                        active
                          ? option.active
                          : "border-steel-300 bg-white text-steel-700 hover:border-navy-400 hover:text-navy-800"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
