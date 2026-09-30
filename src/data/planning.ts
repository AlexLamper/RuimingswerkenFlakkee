// Teamleden die hun beschikbaarheid invullen op /planning.
export const planningPeople = [
  "Alex",
  "Derk",
  "Jouke",
  "Maarten",
  "Niels",
  "Jason",
] as const;

export type PlanningPerson = (typeof planningPeople)[number];

// "ochtend" en "avond" = alleen dat dagdeel beschikbaar; "beschikbaar" = hele
// dag. Zo kan iemand die alleen 's ochtends of alleen 's avonds kan dat laten
// zien in plaats van de dag helemaal open of dicht te zetten.
export type AvailabilityStatus =
  | "beschikbaar"
  | "ochtend"
  | "avond"
  | "niet-beschikbaar";

const AVAILABILITY_STATUSES: readonly AvailabilityStatus[] = [
  "beschikbaar",
  "ochtend",
  "avond",
  "niet-beschikbaar",
];

export function isPlanningPerson(value: unknown): value is PlanningPerson {
  return (
    typeof value === "string" &&
    (planningPeople as readonly string[]).includes(value)
  );
}

export function isAvailabilityStatus(
  value: unknown
): value is AvailabilityStatus {
  return (
    typeof value === "string" &&
    (AVAILABILITY_STATUSES as readonly string[]).includes(value)
  );
}

// Klussen en afspraken op /planning. Een klus kan meerdere dagen duren
// (startDate t/m endDate); een afspraak valt altijd op één dag.
export type PlanningItemKind = "klus" | "afspraak";

// Antwoord van een uitgenodigde op een afspraak.
export type AttendanceResponse = "ja" | "misschien" | "nee";

const ATTENDANCE_RESPONSES: readonly AttendanceResponse[] = [
  "ja",
  "misschien",
  "nee",
];

export type PlanningItem = {
  id: string;
  kind: PlanningItemKind;
  title: string;
  client?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD, alleen bij klussen
  startTime?: string; // HH:MM
  endTime?: string; // HH:MM
  // Klus: wie er gaan. Afspraak: wie er uitgenodigd zijn.
  people: PlanningPerson[];
  responses: Partial<Record<PlanningPerson, AttendanceResponse>>;
  notes?: string;
};

// Invoer vanuit het formulier: alles behalve id en antwoorden.
export type PlanningItemInput = Omit<PlanningItem, "id" | "responses">;

export function isPlanningItemKind(value: unknown): value is PlanningItemKind {
  return value === "klus" || value === "afspraak";
}

export function isAttendanceResponse(
  value: unknown
): value is AttendanceResponse {
  return (
    typeof value === "string" &&
    (ATTENDANCE_RESPONSES as readonly string[]).includes(value)
  );
}
