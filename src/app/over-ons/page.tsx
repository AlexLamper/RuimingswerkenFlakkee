import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Compass, Target } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TeamPhoto } from "@/components/TeamPhoto";
import { TrustBar } from "@/components/TrustBar";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Over ons: regionaal sloopbedrijf op Goeree-Overflakkee",
  description: `Maak kennis met ${company.legalName} - een regionaal sloop- en ruimingsbedrijf op Goeree-Overflakkee dat staat voor veilig, vakkundig en netjes werk.`,
  alternates: { canonical: "/over-ons" },
  openGraph: {
    title: "Over ons - regionaal sloop- en ruimingsbedrijf op Goeree-Overflakkee",
    description:
      "Een hecht, regionaal team dat sloop, ruiming en demontage op Goeree-Overflakkee uitvoert - nuchter, veilig en netjes.",
    url: "/over-ons",
  },
};

const values = [
  "De helpende hand: extra handjes die bijspringen waar het nodig is, groot of klein.",
  "Betaalbaar en eerlijk: een scherpe prijs zonder dure tussenpartij.",
  "Netjes werken: respect voor de omgeving en alles schoon opgeleverd.",
  "Korte lijnen: u heeft één aanspreekpunt van offerte tot oplevering.",
  "Regionale betrokkenheid: wij wonen en werken in dezelfde regio als onze opdrachtgevers.",
];

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over ons"
        title="Een regionaal sloop- en ruimingsbedrijf"
        intro={`${company.name} is een jong klusteam van Goeree-Overflakkee. We houden van aanpakken: u vertelt wat er moet gebeuren, wij regelen het - netjes, op tijd en voor een eerlijke prijs.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Over ons" }]}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-container gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:py-20">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
              Ons verhaal
            </h2>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-steel-700">
              <p>
                {company.name} is begonnen met zeven vrienden die graag de
                handen uit de mouwen steken. We zijn een jong team en delen
                dezelfde kriebel: aanpakken én ondernemen. In plaats van te
                wachten op een bijbaantje zijn we gewoon ons eigen bedrijfje
                gestart.
              </p>
              <p>
                Iedereen brengt iets anders mee. Een paar van ons zitten in de
                werktuigbouwkunde, sommigen hebben hun VCA op zak en de rest
                pakt aan waar het maar kan. Die mix is precies onze kracht: de
                een denkt mee over de techniek, de ander tilt het zware werk -
                ieder zet zijn eigen kwaliteiten in en samen krijgen we de klus
                af.
              </p>
              <p>
                We werken op Goeree-Overflakkee en directe omgeving, voor
                particulieren, agrariërs en bedrijven. Van een tegelvloer eruit
                tot een woning leeghalen of een tuin opruimen: u vertelt wat er
                moet gebeuren, wij regelen het - netjes, op tijd en voor een
                eerlijke prijs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="border border-steel-200 bg-steel-50 p-6 sm:p-7">
              <h3 className="text-base font-semibold uppercase tracking-wider text-navy-900">
                Waar wij voor staan
              </h3>
              <ul className="mt-5 space-y-4">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-3 text-sm text-steel-700">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
                    <span className="leading-relaxed">{value}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-container px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
            <Reveal>
              <div className="overflow-hidden border border-steel-200">
                <TeamPhoto />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
                Missie &amp; visie
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
                Waar wij voor staan
              </h2>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-sm bg-navy-900 text-white">
                    <Target className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">
                      Onze missie
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel-700">
                      Klussen makkelijker maken op Goeree-Overflakkee. U belt of
                      mailt, wij komen helpen - groot of klein.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-sm bg-navy-900 text-white">
                    <Compass className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">
                      Onze visie
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel-700">
                      Laten zien dat goed werk niet duur hoeft te zijn. Eerlijk,
                      betrouwbaar en altijd met respect voor u en de omgeving.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <TrustBar />

      <CTASection
        title="Benieuwd of we voor uw klus de juiste partij zijn?"
        intro="Bel ons gerust of stuur een korte beschrijving. We zijn open en eerlijk over wat we wel en niet doen."
      />
    </>
  );
}
