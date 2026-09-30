// Datumhulpjes voor /planning. Datums zijn overal "YYYY-MM-DD"-strings in de
// lokale tijd van de browser; zo blijven ze vergelijkbaar als tekst.

export const MONTH_NAMES = [
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

const MONTH_SHORT = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dec",
];

export const WEEKDAY_SHORT = ["zo", "ma", "di", "wo", "do", "vr", "za"];

export function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function toIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayIso(): string {
  return toIso(new Date());
}

export function fromIso(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso: string, days: number): string {
  const date = fromIso(iso);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

// Aantal dagen van a naar b (b - a).
export function daysBetween(a: string, b: string): number {
  return Math.round((fromIso(b).getTime() - fromIso(a).getTime()) / 86_400_000);
}

// "di 7 okt"
export function formatDay(iso: string): string {
  const date = fromIso(iso);
  return `${WEEKDAY_SHORT[date.getDay()]} ${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`;
}

// "Vandaag", "Morgen" of "di 7 okt"
export function dayLabel(iso: string, today: string): string {
  const diff = daysBetween(today, iso);
  if (diff === 0) return "Vandaag";
  if (diff === 1) return "Morgen";
  return formatDay(iso);
}

// "di 7 okt" of "ma 6 – wo 8 okt"
export function formatRange(start: string, end?: string): string {
  if (!end || end === start) return formatDay(start);
  const a = fromIso(start);
  const b = fromIso(end);
  const left =
    a.getMonth() === b.getMonth()
      ? `${WEEKDAY_SHORT[a.getDay()]} ${a.getDate()}`
      : formatDay(start);
  return `${left} – ${formatDay(end)}`;
}

// "08:00 – 12:00", "vanaf 08:00" of "" zonder tijd.
export function formatTime(start?: string, end?: string): string {
  if (!start) return "";
  return end ? `${start} – ${end}` : `vanaf ${start}`;
}

// Maandag van de week waarin iso valt.
export function startOfWeek(iso: string): string {
  const day = fromIso(iso).getDay(); // 0 = zondag
  return addDays(iso, -((day + 6) % 7));
}

// ISO-weeknummer.
export function weekNumber(iso: string): number {
  const date = fromIso(iso);
  const thursday = new Date(date);
  thursday.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((thursday.getTime() - firstThursday.getTime()) / 86_400_000 -
        3 +
        ((firstThursday.getDay() + 6) % 7)) /
        7
    )
  );
}

// "Deze week", "Volgende week" of "Week 42"
export function weekLabel(iso: string, today: string): string {
  const diff = daysBetween(startOfWeek(today), startOfWeek(iso)) / 7;
  if (diff <= 0) return "Deze week";
  if (diff === 1) return "Volgende week";
  return `Week ${weekNumber(iso)}`;
}
