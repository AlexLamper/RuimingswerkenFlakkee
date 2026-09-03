// Teamleden die hun beschikbaarheid invullen op /planning.
export const planningPeople = [
  "Alex",
  "Derk",
  "Jouke",
  "Maarten",
  "Niels",
  "Martijn",
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
