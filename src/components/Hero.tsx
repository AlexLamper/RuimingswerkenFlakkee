import Link from "next/link";
import { BadgeCheck, Mail } from "lucide-react";
import { company } from "@/data/company";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto grid max-w-container items-center gap-10 px-5 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-navy-900 shadow-card sm:text-xs">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            Eerlijke prijs - Netjes opgeleverd
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
            Even een paar extra handjes nodig?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-200 sm:text-lg lg:text-lg">
            Wij zijn een jong, gedreven team op Goeree-Overflakkee dat bijspringt
            waar het nodig is: sloop, ruiming, demontage, ontruiming en opruimen.
            Van een betonvloer tot het leeghalen van een woning of het opknappen
            van een tuin - we pakken aan, leveren netjes op en doen dat voor een
            eerlijke prijs.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-steel-100 sm:w-auto"
            >
              Offerte aanvragen
            </Link>
            <a
              href={company.emailHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-steel-400/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:w-auto"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Mail ons
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
