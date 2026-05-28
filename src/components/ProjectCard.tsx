import { ImageIcon, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

/**
 * Project-kaart met afbeelding-placeholder.
 *
 * Vervang het bovenste placeholder-blok door een echte foto:
 *
 *   <Image
 *     src={`/foto/project-${project.number}.jpg`}
 *     alt={`${project.title} - ${project.location}`}
 *     fill
 *     className="object-cover"
 *   />
 */
export function ProjectCard({ project }: Props) {
  return (
    <article className="flex h-full flex-col border border-steel-200 bg-white">
      <div
        className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-steel-400/25 bg-navy-900/40">
            <ImageIcon
              className="h-5 w-5 stroke-[1.25] text-steel-400"
              aria-hidden
            />
          </div>
        </div>

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-steel-400/25 bg-navy-900/65 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-steel-200 backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-white" />
          Foto {project.number}
        </span>

        <span className="absolute right-3 top-3 inline-flex items-center rounded-sm bg-navy-800/75 px-2.5 py-1 text-[11px] font-medium text-steel-100 backdrop-blur-sm">
          {project.scope}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-900">{project.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-steel-500">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {project.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-steel-600">
          {project.description}
        </p>
        <p className="mt-5 border-t border-steel-200 pt-4 text-sm font-medium text-navy-900">
          Resultaat:{" "}
          <span className="font-normal text-steel-700">{project.result}</span>
        </p>
      </div>
    </article>
  );
}
