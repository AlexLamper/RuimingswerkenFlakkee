import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { company } from "@/data/company";

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
      <div className="relative mx-auto grid max-w-container gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm border border-navy-700 bg-navy-800/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-steel-200">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Vakwerk op Goeree-Overflakkee
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {company.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-200 md:text-xl">
            Sloop, ruiming, demontage en ontruiming — uitgevoerd door een
            ervaren team dat zijn werk netjes en volgens afspraak oplevert.
            Van een enkele schuur tot een compleet bedrijfspand.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-steel-100"
            >
              Offerte aanvragen
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-steel-400/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Bel {company.phone}
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <dl className="grid grid-cols-2 gap-px border border-navy-700 bg-navy-700 text-sm">
            <div className="bg-navy-900 p-6">
              <dt className="text-xs uppercase tracking-wider text-steel-300">Regio</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                Goeree-Overflakkee
              </dd>
            </div>
            <div className="bg-navy-900 p-6">
              <dt className="text-xs uppercase tracking-wider text-steel-300">Werkterrein</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                Sloop & ruiming
              </dd>
            </div>
            <div className="bg-navy-900 p-6">
              <dt className="text-xs uppercase tracking-wider text-steel-300">Aanpak</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                Veilig & netjes
              </dd>
            </div>
            <div className="bg-navy-900 p-6">
              <dt className="text-xs uppercase tracking-wider text-steel-300">Offerte</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                Binnen 48 uur
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
