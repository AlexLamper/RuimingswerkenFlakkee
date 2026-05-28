import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
};

export function PageHeader({ eyebrow, title, intro, crumbs }: Props) {
  return (
    <section className="border-b border-steel-200 bg-navy-900 text-white">
      <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-14 lg:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Kruimelpad" className="mb-5 text-xs text-steel-300 sm:mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-300 sm:text-xs">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-steel-200 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
