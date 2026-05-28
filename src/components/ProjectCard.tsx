import { MapPin } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="flex h-full flex-col border border-steel-200 bg-white">
      <div className="relative flex h-32 items-end justify-between bg-navy-900 p-5 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 14px)",
          }}
        />
        <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-steel-300">
          Project {project.number}
        </span>
        <span className="relative inline-flex items-center gap-1.5 rounded-sm bg-navy-800 px-2.5 py-1 text-xs font-medium text-steel-100">
          {project.scope}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-navy-900">{project.title}</h3>
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-steel-500">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {project.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-steel-600">
          {project.description}
        </p>
        <p className="mt-5 border-t border-steel-200 pt-4 text-sm font-medium text-navy-900">
          Resultaat: <span className="font-normal text-steel-700">{project.result}</span>
        </p>
      </div>
    </article>
  );
}
