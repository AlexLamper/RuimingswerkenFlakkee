import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Wrench } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustBar } from "@/components/TrustBar";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

const valuePillars = [
  {
    icon: ShieldCheck,
    title: "Veilig",
    text: "Werken volgens geldende normen, met aandacht voor omgeving en omwonenden.",
  },
  {
    icon: Wrench,
    title: "Vakkundig",
    text: "Ervaren team met het juiste materieel — van compactgraver tot grijper.",
  },
  {
    icon: Users,
    title: "Persoonlijk",
    text: "Eén aanspreekpunt, korte lijnen en heldere afspraken — van offerte tot oplevering.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      <section className="bg-white">
        <div className="mx-auto max-w-container px-6 py-20 lg:py-24">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Onze diensten"
              title="Sloop, ruiming en alles daartussen"
              intro="Of het nu om een enkele schuur gaat of om een compleet bedrijfsterrein — we pakken het in één hand aan, van aanvraag tot afvoer."
            />
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:underline"
            >
              Bekijk alle diensten
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-steel-50">
        <div className="mx-auto grid max-w-container gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <SectionHeading
              eyebrow="Over ons"
              title="Een regionaal bedrijf met oog voor detail"
              intro={`${company.name} is een klein, regionaal bedrijf, geworteld in ${company.region}. We zijn een hechte ploeg die sloopwerken, ruimingen en demontagewerkzaamheden uitvoert met een nuchtere, praktische aanpak.`}
            />
            <p className="mt-5 text-base leading-relaxed text-steel-700">
              We weten dat de meeste klussen niet alleen om kracht draaien,
              maar ook om netjes werken: de omgeving netjes achterlaten,
              afspraken nakomen en helder communiceren. Daar staan we voor.
            </p>
            <Link
              href="/over-ons"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:underline"
            >
              Lees meer over ons
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {valuePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex h-full flex-col border border-steel-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-900 text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-container px-6 py-20 lg:py-24">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Uitgelichte projecten"
              title="Recent uitgevoerd werk"
              intro="Een greep uit de klussen waar we onlangs aan hebben gewerkt — verspreid over Goeree-Overflakkee."
            />
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:underline"
            >
              Alle projecten
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
