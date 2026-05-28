import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { PageHeader } from "@/components/PageHeader";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op met ${company.name} voor een vrijblijvende offerte. Bereikbaar per telefoon, e-mail of via het contactformulier.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Vrijblijvend een offerte aanvragen"
        intro="Heeft u een klus die geruimd, gesloopt of gedemonteerd moet worden? Laat het ons weten - we reageren doorgaans binnen één werkdag."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-steel-50">
        <div className="mx-auto grid max-w-container gap-6 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.3fr] lg:py-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
