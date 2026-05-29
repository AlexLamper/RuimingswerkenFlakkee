import { faqs } from "@/data/faq";
import { faqSchema } from "@/lib/structured-data";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Veelgestelde vragen + FAQPage structured data (kans op rich results in Google).
export function Faq() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-container px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <JsonLd data={faqSchema()} />
        <Reveal>
          <SectionHeading
            eyebrow="Veelgestelde vragen"
            title="Veelgestelde vragen over sloop en ruiming"
            intro="De vragen die we het vaakst krijgen over werken op Goeree-Overflakkee. Staat uw vraag er niet bij? Neem gerust contact op."
            align="center"
          />
        </Reveal>

        <dl className="mx-auto mt-10 max-w-3xl divide-y divide-steel-200 border-y border-steel-200 text-center">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <div className="py-6">
                <dt className="text-base font-semibold text-navy-900 md:text-lg">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-steel-600 md:text-base">
                  {faq.answer}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
