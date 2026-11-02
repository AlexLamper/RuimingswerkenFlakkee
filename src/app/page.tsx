import Link from "next/link";
import { ArrowRight, HandHelping, ShieldCheck, Wallet } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceArea } from "@/components/ServiceArea";
import { ServiceCard } from "@/components/ServiceCard";
import { TeamPhoto } from "@/components/TeamPhoto";
import { TrustBar } from "@/components/TrustBar";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

// Max. 3 projecten op de homepage: de nieuwste klussen + het dakproject.
const HOME_PROJECTS = [
  "schuur-binnenkant-demonteren",
  "materiaalstelling-opbouwen",
  "dak-eraf-stad-aant-haringvliet",
];

const homeProjects = HOME_PROJECTS.map((slug) =>
  projects.find((p) => p.slug === slug),
).filter((p): p is (typeof projects)[number] => Boolean(p));

const valuePillars = [
  {
    icon: Wallet,
    title: "Betaalbaar",
    text: "Extra handjes voor een eerlijke prijs - geen dure tussenpartij, gewoon aanpakken.",
  },
  {
    icon: HandHelping,
    title: "De helpende hand",
    text: "Een jong, gedreven team dat bijspringt waar het nodig is. Groot of klein, alles welkom.",
  },
  {
    icon: ShieldCheck,
    title: "Netjes & eerlijk",
    text: "We werken veilig, leveren bezemschoon op en zijn eerlijk over wat we wel en niet doen.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      {/* Uitnodigende kennismaking met het team */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-container gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:py-24">
          <Reveal>
            <div className="overflow-hidden border border-steel-200">
              <TeamPhoto
                src="/images/algemeen/teamfoto.jpg"
                className="aspect-square object-[50%_68%]"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Wie zijn wij"
              title="Een stel jonge gasten dat de handen uit de mouwen steekt"
              intro={`${company.name} is opgezet door een groep jonge, gedreven gasten van Goeree-Overflakkee die graag aanpakken en zo een eigen bedrijfje opbouwen. Zie ons als de helpende hand: betaalbare, extra handjes voor sloop, ruiming en alles wat geruimd of opgeknapt moet worden.`}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {valuePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex h-full flex-col border border-steel-200 bg-white p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy-900 text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-navy-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-steel-600">
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 border-l-2 border-navy-900 bg-steel-50 px-4 py-3 text-sm leading-relaxed text-steel-700">
              <span className="font-semibold text-navy-900">Let op:</span>{" "}
              {company.noAsbestos}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-container px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Onze diensten"
                title="Waar we mee kunnen helpen"
                intro="Denk aan een verbouwing, iets slopen, demonteren of een flinke opruiming - wij springen bij met extra handen. Vooral het kleinere sloop- en opruimwerk is precies ons ding."
              />
              <Link
                href="/diensten"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:underline"
              >
                Bekijk alle diensten
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-steel-50">
        <div className="mx-auto max-w-container px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Uitgelichte projecten"
                title="Recent uitgevoerd werk"
                intro="Een paar klussen waar we onlangs onze handen uit de mouwen hebben gestoken. Klik door voor meer foto's."
              />
              <Link
                href="/projecten"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:underline"
              >
                Alle projecten
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {homeProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceArea />

      <Faq />

      <CTASection />
    </>
  );
}
