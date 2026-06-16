import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const points = [
  "Goedkoopste van Flakkee",
  "Snel geregeld - vaak op korte termijn op locatie",
  "Persoonlijk: één vast aanspreekpunt, korte lijnen",
  "Vrijblijvende offerte binnen 48 uur",
];

export function TrustBar() {
  return (
    <section className="border-y border-steel-200 bg-steel-50">
      <div className="mx-auto grid max-w-container gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {points.map((point, i) => (
          <Reveal key={point} delay={i * 80}>
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 flex-none text-navy-700"
                aria-hidden
              />
              <p className="text-sm font-medium leading-snug text-steel-700">
                {point}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
