import { MapPin } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WorkAreaMap } from "./WorkAreaMap";

// Werkgebied: kaart van Goeree-Overflakkee + plaatsen waar we werken.
// Goed voor lokale SEO ("sloopbedrijf in de buurt") en plaatsgerichte zoekopdrachten.

export function ServiceArea() {
  return (
    <section className="border-t border-steel-200 bg-steel-50">
      <div className="mx-auto max-w-container px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Werkgebied"
              title="Het liefst werken we op Goeree-Overflakkee"
              intro="Wij zijn van het eiland en werken het liefst dicht bij huis - heel Goeree-Overflakkee. Korte lijnen, snel ter plaatse en bekend met de buurt."
            />

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {company.places.map((place) => (
                <li
                  key={place}
                  className="inline-flex items-center gap-1.5 border border-steel-200 bg-white px-3 py-1.5 text-sm font-medium text-navy-900"
                >
                  <MapPin
                    className="h-3.5 w-3.5 flex-none text-navy-700"
                    aria-hidden
                  />
                  {place}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-steel-600">
              Staat uw plaats er niet bij? In de directe omgeving werken we ook -
              bel gerust om te overleggen.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <figure className="overflow-hidden border border-steel-200 bg-white shadow-card">
              <div className="flex items-center gap-2 border-b border-steel-200 bg-navy-900 px-4 py-2.5 text-white">
                <MapPin className="h-4 w-4 flex-none" aria-hidden />
                <span className="text-sm font-semibold">
                  Ons werkgebied · Goeree-Overflakkee
                </span>
              </div>
              <WorkAreaMap />
              <figcaption className="border-t border-steel-200 px-4 py-2.5 text-xs text-steel-600">
                Heel het eiland, korte lijnen - snel bij u ter plaatse.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
