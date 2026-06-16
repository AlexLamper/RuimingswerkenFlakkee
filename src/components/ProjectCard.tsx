import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

/** Project-kaart met echte coverfoto - linkt naar de klus op de projectenpagina. */
export function ProjectCard({ project }: Props) {
  const cover = project.photos[0];

  return (
    <Link
      href={`/projecten#${project.slug}`}
      className="group flex h-full flex-col border border-steel-200 bg-white transition-colors hover:border-navy-700"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 inline-flex items-center rounded-sm bg-navy-900/80 px-2.5 py-1 text-[11px] font-medium text-steel-100 backdrop-blur-sm">
          {project.scope}
        </span>

        {project.photos.length > 1 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-navy-900/80 px-2 py-1 text-[11px] font-medium text-steel-100 backdrop-blur-sm">
            <ImageIcon className="h-3.5 w-3.5" aria-hidden />
            {project.photos.length}
          </span>
        )}
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
        <span className="mt-5 inline-flex items-center gap-1.5 border-t border-steel-200 pt-4 text-sm font-semibold text-navy-900">
          Bekijk project
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
