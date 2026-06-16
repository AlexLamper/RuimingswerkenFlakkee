import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projecten: uitgevoerd sloop- & ruimingswerk",
  description:
    "Recent uitgevoerde klussen op Goeree-Overflakkee - van een woningverbouwing in Ouddorp tot een woningontruiming en het opruimen van een terrein in Middelharnis. Bekijk de foto's.",
  alternates: { canonical: "/projecten" },
  openGraph: {
    title: "Projecten - uitgevoerd sloop- en ruimingswerk op Goeree-Overflakkee",
    description:
      "Een greep uit recent uitgevoerde klussen op Goeree-Overflakkee: verbouwing, ontruiming en het opruimen van tuin en terrein.",
    url: "/projecten",
  },
};

export default function ProjectenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Referenties"
        title="Recent uitgevoerde klussen"
        intro="Een greep uit het werk van de afgelopen tijd. Echte klussen, echte foto's - per klus op een rij gezet."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projecten" }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <article
                id={project.slug}
                className={`scroll-mt-28 ${
                  i > 0 ? "mt-12 border-t border-steel-200 pt-12 lg:mt-16 lg:pt-16" : ""
                }`}
              >
                <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-sm font-semibold text-steel-400">
                    {project.number}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                    {project.title}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-sm text-steel-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {project.location}
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-navy-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-navy-700">
                    {project.scope}
                  </span>
                </header>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
                  <p className="text-base leading-relaxed text-steel-700">
                    {project.description}{" "}
                    <span className="text-navy-900">{project.result}</span>
                  </p>

                  <ProjectGallery photos={project.photos} title={project.title} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Uw klus op deze pagina?"
        intro="Of het nu groot of klein is - we springen graag bij. Vraag vrijblijvend een offerte aan."
      />
    </>
  );
}
