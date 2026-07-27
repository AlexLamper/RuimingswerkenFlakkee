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

export type AvailabilityStatus = "beschikbaar" | "niet-beschikbaar";

export function isPlanningPerson(value: unknown): value is PlanningPerson {
  return (
    typeof value === "string" &&
    (planningPeople as readonly string[]).includes(value)
  );
}

export function isAvailabilityStatus(
  value: unknown
): value is AvailabilityStatus {
  return value === "beschikbaar" || value === "niet-beschikbaar";
}
