"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import {
  planningPeople,
  type PlanningItem,
  type PlanningItemInput,
  type PlanningItemKind,
  type PlanningPerson,
} from "@/data/planning";
import { todayIso } from "@/lib/planning-dates";
import type { ActionResult } from "./usePlanningItems";
import { KIND_LOOK } from "./PlanningItemCard";

// Wat de dialoog opent: een nieuw item van een soort, of een bestaand item.
export type DialogTarget =
  | { mode: "new"; kind: PlanningItemKind; date?: string }
  | { mode: "edit"; item: PlanningItem };

type FormState = {
  title: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  people: PlanningPerson[];
  notes: string;
};

function initialState(
  target: DialogTarget,
  person: PlanningPerson | null
): FormState {
  if (target.mode === "edit") {
    const { item } = target;
    return {
      title: item.title,
      client: item.client ?? "",
      location: item.location ?? "",
      startDate: item.startDate,
      endDate: item.endDate ?? "",
      startTime: item.startTime ?? "",
      endTime: item.endTime ?? "",
      people: item.people,
      notes: item.notes ?? "",
    };
  }
  return {
    title: "",
    client: "",
    location: "",
    startDate: target.date ?? todayIso(),
    endDate: "",
    startTime: "",
    endTime: "",
    // Afspraak: standaard iedereen uitgenodigd. Klus: standaard jijzelf.
    people:
      target.kind === "afspraak"
        ? [...planningPeople]
        : person
          ? [person]
          : [],
    notes: "",
  };
}

const inputClass =
  "mt-1 block w-full rounded-lg border border-steel-300 bg-white px-3 py-2 text-sm text-navy-900 shadow-sm outline-none transition placeholder:text-steel-400 focus:border-navy-500 focus:ring-2 focus:ring-navy-200";
const labelClass = "block text-sm font-semibold text-navy-900";

export function PlanningItemDialog({
  target,
  person,
  onClose,
  onSave,
  onDelete,
}: {
  target: DialogTarget;
  person: PlanningPerson | null;
  onClose: () => void;
  onSave: (input: PlanningItemInput) => Promise<ActionResult>;
  onDelete: () => Promise<ActionResult>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState<FormState>(() =>
    initialState(target, person)
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const kind = target.mode === "edit" ? target.item.kind : target.kind;
  const isKlus = kind === "klus";
  const look = KIND_LOOK[kind];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function togglePerson(name: PlanningPerson) {
    setForm((current) => ({
      ...current,
      people: current.people.includes(name)
        ? current.people.filter((p) => p !== name)
        : planningPeople.filter(
            (p) => p === name || current.people.includes(p)
          ),
    }));
  }

  const everyone = form.people.length === planningPeople.length;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Vul in wat het is.");
      return;
    }
    if (isKlus && form.endDate && form.endDate < form.startDate) {
      setError("De einddatum ligt vóór de begindatum.");
      return;
    }
    setBusy(true);
    setError(null);
    const result = await onSave({
      kind,
      title: form.title,
      client: form.client || undefined,
      location: form.location || undefined,
      startDate: form.startDate,
      endDate: isKlus && form.endDate ? form.endDate : undefined,
      startTime: form.startTime || undefined,
      endTime: form.endTime || undefined,
      people: form.people,
      notes: form.notes || undefined,
    });
    setBusy(false);
    if (result.ok) onClose();
    else setError(result.error);
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setBusy(true);
    const result = await onDelete();
    setBusy(false);
    if (result.ok) onClose();
    else setError(result.error);
  }

  const heading =
    target.mode === "edit"
      ? `${look.label} aanpassen`
      : isKlus
        ? "Nieuwe klus"
        : "Nieuwe afspraak";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="planning-dialog-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-white p-0 text-navy-900 backdrop:bg-navy-950/50 sm:m-auto sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl sm:shadow-xl"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-steel-200 px-5 py-4">
          <h2
            id="planning-dialog-title"
            className="flex items-center gap-2 text-lg font-bold"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${look.badge}`}
            >
              <look.Icon className="h-4 w-4" aria-hidden />
            </span>
            {heading}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-steel-500 transition hover:bg-steel-100 hover:text-navy-800"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div>
            <label htmlFor="pi-title" className={labelClass}>
              Wat?
            </label>
            <input
              id="pi-title"
              required
              maxLength={120}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder={
                isKlus ? "Bijv. woning leeghalen" : "Bijv. teamvergadering"
              }
              className={inputClass}
              autoFocus={target.mode === "new"}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={isKlus ? "" : "col-span-2"}>
              <label htmlFor="pi-start" className={labelClass}>
                {isKlus ? "Van" : "Datum"}
              </label>
              <input
                id="pi-start"
                type="date"
                required
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                className={inputClass}
              />
            </div>
            {isKlus && (
              <div>
                <label htmlFor="pi-end" className={labelClass}>
                  T/m <span className="font-normal text-steel-400">(optioneel)</span>
                </label>
                <input
                  id="pi-end"
                  type="date"
                  min={form.startDate}
                  value={form.endDate}
                  onChange={(e) => set("endDate", e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
            <div>
              <label htmlFor="pi-start-time" className={labelClass}>
                Begintijd{" "}
                <span className="font-normal text-steel-400">(optioneel)</span>
              </label>
              <input
                id="pi-start-time"
                type="time"
                value={form.startTime}
                onChange={(e) => set("startTime", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="pi-end-time" className={labelClass}>
                Eindtijd{" "}
                <span className="font-normal text-steel-400">(optioneel)</span>
              </label>
              <input
                id="pi-end-time"
                type="time"
                value={form.endTime}
                onChange={(e) => set("endTime", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="pi-client" className={labelClass}>
              Klant{" "}
              {!isKlus && (
                <span className="font-normal text-steel-400">(optioneel)</span>
              )}
            </label>
            <input
              id="pi-client"
              maxLength={120}
              value={form.client}
              onChange={(e) => set("client", e.target.value)}
              placeholder="Naam klant"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="pi-location" className={labelClass}>
              Adres / plaats
            </label>
            <input
              id="pi-location"
              maxLength={200}
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Bijv. Voorstraat 12, Middelharnis"
              className={inputClass}
            />
          </div>

          <fieldset>
            <div className="flex items-center justify-between gap-2">
              <legend className={labelClass}>
                {isKlus ? "Wie gaan er?" : "Wie zijn er uitgenodigd?"}
              </legend>
              <button
                type="button"
                onClick={() =>
                  set("people", everyone ? [] : [...planningPeople])
                }
                className="text-xs font-semibold text-navy-700 hover:underline"
              >
                {everyone ? "Niemand" : "Iedereen"}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {planningPeople.map((name) => {
                const selected = form.people.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => togglePerson(name)}
                    aria-pressed={selected}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                      selected
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-steel-300 bg-white text-steel-700 hover:border-navy-400 hover:text-navy-800"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="pi-notes" className={labelClass}>
              Notities{" "}
              <span className="font-normal text-steel-400">(optioneel)</span>
            </label>
            <textarea
              id="pi-notes"
              rows={3}
              maxLength={2000}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder={
                isKlus
                  ? "Bijv. sleutel bij de buren, container besteld"
                  : "Bijv. agenda of onderwerp"
              }
              className={inputClass}
            />
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
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-steel-200 px-5 py-4">
          {target.mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                confirmDelete
                  ? "border-red-600 bg-red-600 text-white hover:bg-red-700"
                  : "border-steel-300 bg-white text-red-700 hover:border-red-400"
              }`}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              {confirmDelete ? "Zeker weten?" : "Verwijderen"}
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-steel-300 bg-white px-4 py-2 text-sm font-semibold text-steel-700 transition hover:border-navy-400 hover:text-navy-800"
            >
              Annuleren
            </button>
            <button
              type="submit"
              disabled={busy}
              className="flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Opslaan
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
