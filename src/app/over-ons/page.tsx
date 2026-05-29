import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
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
  "Veiligheid voor uzelf, uw omgeving en ons team staat altijd voorop.",
  "Heldere communicatie en realistische planningen - wat we afspreken, doen we.",
  "Netjes werken: stromen scheiden, omgeving respecteren, schoon opleveren.",
  "Korte lijnen: u heeft één aanspreekpunt van offerte tot oplevering.",
  "Regionale betrokkenheid: wij wonen, werken en sporen in dezelfde regio als onze opdrachtgevers.",
];

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over ons"
        title="Een regionaal sloop- en ruimingsbedrijf"
        intro={`${company.name} is een hecht bedrijf dat zijn thuis heeft op Goeree-Overflakkee. We zijn een team dat geen kantoorpraat houdt, maar gewoon aanpakt - netjes, op tijd en zoals afgesproken.`}
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
                {company.name} is opgericht door zes vrienden die samen
                een bedrijf wilden beginnen. Ieder met een eigen achtergrond
                in bouw, grondverzet, demontage of installatiewerk - bij
                elkaar opgeteld een breed pakket aan kennis en ervaring,
                gebundeld in één aanspreekpunt voor wat tot dan toe
                versnipperd geregeld werd.
              </p>
              <p>
                Dat plan hebben we doorgezet. Bewust op regionale schaal:
                we werken vooralsnog uitsluitend op Goeree-Overflakkee en
                directe omgeving. Niet uit beperking, maar omdat het zo
                hoort. Zo houden we de lijnen kort, blijven we het gezicht
                voor onze opdrachtgevers en kunnen we de kwaliteit leveren
                die wij van onszelf verwachten.
              </p>
              <p>
                We werken voor particulieren, agrariërs, projectontwikkelaars
                en bedrijven. Van een betonvloer in een woonhuis tot een
                volledige bedrijfsontruiming na een doorstart - we voelen
                ons bij beide thuis. Het soort werk verandert, de aanpak
                niet: eerst goed kijken, dan goed doen. Dat is geen
                marketingverhaal, maar de manier waarop we vanaf dag één
                werken.
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

      <TrustBar />

      <CTASection
        title="Benieuwd of we voor uw klus de juiste partij zijn?"
        intro="Bel ons gerust of stuur een korte beschrijving. We zijn open en eerlijk over wat we wel en niet doen."
      />
    </>
  );
}
