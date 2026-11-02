import type { Metadata } from "next";
import { AlertTriangle, Check } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { company } from "@/data/company";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Diensten: sloopwerken, demontage & ruiming",
  description:
    "Sloopwerken, demontage, ontruimingen, beton- en constructiesloop, terreinsanering en gescheiden afvoer op Goeree-Overflakkee. Alles in één hand, vrijblijvende offerte.",
  alternates: { canonical: "/diensten" },
  openGraph: {
    title: "Diensten: sloopwerken, demontage & ruiming op Goeree-Overflakkee",
    description:
      "Het volledige pakket sloop- en ruimingswerkzaamheden op Goeree-Overflakkee - van bezichtiging tot bezemschone oplevering.",
    url: "/diensten",
  },
};

const process = [
  {
    step: "01",
    title: "Bezichtiging op locatie",
    text: "We komen vrijblijvend langs, bekijken het werk en stemmen wensen en planning af.",
  },
  {
    step: "02",
    title: "Heldere offerte",
    text: "U ontvangt een duidelijke offerte met scope, planning en afspraken over afvoer.",
  },
  {
    step: "03",
    title: "Uitvoering",
    text: "Op de afgesproken datum staan we klaar - veilig, netjes en met oog voor de omgeving.",
  },
  {
    step: "04",
    title: "Oplevering",
    text: "We leveren bezemschoon op en zorgen voor correcte afvoer van alle stromen.",
  },
];

export default function DienstenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wat wij doen"
        title="Waar we mee kunnen helpen"
        intro="Een paar extra handen voor de klussen die blijven liggen: slopen, demonteren, leeghalen en opruimen. We zijn er vooral voor het kleinere sloop- en opruimwerk - daar staan we voor u klaar."
        crumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
                Extra handen voor de klussen die blijven liggen
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-700">
                Niet voor het grote sloopwerk, wél voor alles eromheen: een
                binnenwand of tegelvloer eruit, een schuurtje afbreken, een
                woning of garage leeghalen of een tuin opruimen. U belt of mailt,
                wij komen kijken en pakken aan - netjes en voor een eerlijke prijs.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {["Particulieren", "Agrariërs", "Bedrijven", "Verhuur & beheer"].map(
                  (who) => (
                    <li
                      key={who}
                      className="inline-flex items-center rounded-sm border border-steel-200 bg-steel-50 px-3 py-1.5 text-sm font-medium text-navy-900"
                    >
                      {who}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="border-l-2 border-navy-900 bg-steel-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-navy-700">
                  Goed om te weten
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-steel-700">
                  <li className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-navy-700" aria-hidden />
                    Vrijblijvende offerte binnen 48 uur
                  </li>
                  <li className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-navy-700" aria-hidden />
                    Eén vast aanspreekpunt van begin tot eind
                  </li>
                  <li className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-navy-700" aria-hidden />
                    Puin en afval voeren we netjes voor u af
                  </li>
                  <li className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-navy-700" aria-hidden />
                    Betaalbaar en eerlijk geprijsd
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:mt-16">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70} className="h-full">
                <ServiceCard service={service} variant="detailed" />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex items-start gap-3 border-l-2 border-navy-900 bg-steel-50 p-5 sm:mt-10">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 flex-none text-navy-700"
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-steel-700">
                <span className="font-semibold text-navy-900">
                  Geen asbest.
                </span>{" "}
                {company.noAsbestos}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
                Hoe een opdracht bij ons verloopt
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-700">
                Een vaste werkwijze waar u op kunt rekenen - geen verrassingen
                achteraf en altijd één aanspreekpunt.
              </p>
            </Reveal>
            <ol className="space-y-4 text-sm text-steel-700 sm:space-y-5">
              {process.map((item, i) => (
                <Reveal key={item.step} delay={i * 90}>
                  <li className="flex gap-4 border-l-2 border-navy-900 bg-white p-5 sm:gap-5">
                    <span className="font-bold text-navy-900">{item.step}</span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-steel-600">
                        {item.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTASection
        title="Specifieke vraag over een dienst?"
        intro="Neem gerust contact op. We denken graag mee, ook bij minder voor de hand liggende klussen."
      />
    </>
  );
}
