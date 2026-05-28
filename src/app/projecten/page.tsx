import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projecten",
  description:
    "Een selectie van recent uitgevoerde sloop-, ontruimings- en demontageprojecten van RuimingswerkenFlakkee op Goeree-Overflakkee.",
};

export default function ProjectenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Referenties"
        title="Recente projecten"
        intro="Een greep uit het werk van de afgelopen tijd. Locatie, scope en resultaat - kort en feitelijk."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projecten" }]}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Uw project op deze pagina?"
        intro="Wij maken graag werk van uw volgende klus. Vraag vrijblijvend een offerte aan."
      />
    </>
  );
}
