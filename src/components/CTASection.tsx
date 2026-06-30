import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "./Reveal";

type Props = {
  title?: string;
  intro?: string;
};

export function CTASection({
  title = "Een klus die geruimd of gesloopt moet worden?",
  intro = "Stuur een korte beschrijving van het werk en we komen graag vrijblijvend langs voor een offerte op locatie.",
}: Props) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-14 lg:py-16">
        <Reveal>
          <div className="flex flex-col items-start gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
              <p className="mt-3 text-base leading-relaxed text-steel-200">{intro}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                {company.phone}
              </a>
              <a
                href={company.emailHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-steel-400/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:w-auto"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Mail ons
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
