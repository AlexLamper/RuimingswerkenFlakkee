import { MapPin } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Werkgebied-sectie: maakt de plaatsen waar we werken expliciet zichtbaar.
// Goed voor lokale SEO ("sloopbedrijf in de buurt") en plaatsgerichte zoekopdrachten.
export function ServiceArea() {
  return (
    <section className="border-t border-steel-200 bg-steel-50">
      <div className="mx-auto max-w-container px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Werkgebied"
            title="Sloop- en ruimingswerken in heel Goeree-Overflakkee"
            intro="Op zoek naar een sloopbedrijf bij u in de buurt? Wij zijn lokaal en werken op heel Goeree-Overflakkee - korte lijnen en snel ter plaatse."
          />
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-8 flex flex-wrap gap-2.5 sm:mt-10">
            {company.places.map((place) => (
              <li
                key={place}
                className="inline-flex items-center gap-1.5 border border-steel-200 bg-white px-3.5 py-2 text-sm font-medium text-navy-900"
              >
                <MapPin className="h-3.5 w-3.5 flex-none text-navy-700" aria-hidden />
                {place}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-steel-600">
            Staat uw plaats er niet bij? We werken ook in de directe omgeving van{" "}
            {company.region.replace(" en omgeving", "")}. Bel ons gerust om te
            overleggen - we denken graag mee over sloop, ruiming, ontruiming,
            betonsloop, demontage en terreinsanering.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
