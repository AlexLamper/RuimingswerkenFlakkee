import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
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
          <span className="inline-flex items-center gap-2 rounded-sm border border-navy-700 bg-navy-800/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-steel-200 sm:text-xs">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Vakwerk op Goeree-Overflakkee
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            Ruimingswerken Flakkee
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-200 sm:text-lg lg:text-lg">
            Uw sloopbedrijf op Goeree-Overflakkee voor sloop, ruiming, demontage
            en ontruiming - uitgevoerd door een jong gedreven team dat zijn werk netjes
            en volgens afspraak oplevert. Van een betonvloer tot het opruimen van uw tuin, wij staan voor u klaar. 
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-steel-100 sm:w-auto"
            >
              Offerte aanvragen
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-steel-400/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Bel {company.phone}
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
