import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Sloopwerken, demontage, ontruimingen, beton en constructiesloop, terreinsanering en gescheiden afvoer - uitgevoerd door RuimingswerkenFlakkee op Goeree-Overflakkee.",
};

export default function DienstenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wat wij doen"
        title="Onze diensten"
        intro="Een volledig pakket aan sloop- en ruimingswerkzaamheden. Alles in één hand: van eerste schouw tot bezemschone oplevering."
        crumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                variant="detailed"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
                Hoe een opdracht bij ons verloopt
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-700">
                Een vaste werkwijze waar u op kunt rekenen - geen verrassingen
                achteraf en altijd één aanspreekpunt.
              </p>
            </div>
            <ol className="space-y-4 text-sm text-steel-700 sm:space-y-5">
              {[
                {
                  step: "01",
                  title: "Schouw op locatie",
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
              ].map((item) => (
                <li
                  key={item.step}
                  className="flex gap-4 border-l-2 border-navy-900 bg-white p-5 sm:gap-5"
                >
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
