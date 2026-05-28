"use client";

// Het formulier opent op submit de standaard mailclient van de bezoeker met
// een prefilled bericht. Werkt 100% statisch, kost niets, geen externe API.
//
// Wil je echte server-side bezorging zonder backend? Maak gratis een account
// op https://web3forms.com/, vervang in `handleSubmit` de mailto-flow door:
//
//   await fetch("https://api.web3forms.com/submit", {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
//     body: JSON.stringify({ access_key: "JOUW_KEY", ...form }),
//   });
//
// Dat is de hele wijziging — geen verdere setup nodig.

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { company } from "@/data/company";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const empty: FormState = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Offerteaanvraag van ${form.name || "website-bezoeker"}`;
    const body = [
      `Naam: ${form.name}`,
      `E-mail: ${form.email}`,
      `Telefoon: ${form.phone || "—"}`,
      "",
      "Bericht:",
      form.message,
    ].join("\n");

    const mailto = `${company.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-steel-200 bg-white p-7"
      aria-label="Contactformulier"
    >
      <h2 className="text-xl font-semibold text-navy-900">Stuur een bericht</h2>
      <p className="mt-2 text-sm leading-relaxed text-steel-600">
        Vul het formulier in en uw mailprogramma opent automatisch met het
        bericht klaar om te verzenden.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Naam"
          required
          value={form.name}
          onChange={update("name")}
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
        />
        <Field
          id="phone"
          label="Telefoon (optioneel)"
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          className="sm:col-span-2"
        />
        <TextareaField
          id="message"
          label="Bericht"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Beschrijf kort het werk: locatie, omvang en gewenste planning."
          className="sm:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden />
        Verstuur via mail
      </button>

      {sent && (
        <p
          role="status"
          className="mt-4 border border-navy-200 bg-navy-50 px-4 py-3 text-sm text-navy-900"
        >
          Uw mailprogramma is geopend met het bericht. Klik daar nog op
          &ldquo;verzenden&rdquo; om het naar ons te sturen.
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

function Field({
  id,
  label,
  type = "text",
  required,
  value,
  onChange,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wider text-steel-600"
      >
        {label}
        {required && <span className="ml-1 text-navy-700">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full rounded-sm border border-steel-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-700 focus:ring-2 focus:ring-navy-200"
      />
    </div>
  );
}

type TextareaFieldProps = Omit<FieldProps, "onChange" | "type"> & {
  rows?: number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextareaField({
  id,
  label,
  required,
  value,
  onChange,
  rows = 4,
  placeholder,
  className = "",
}: TextareaFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wider text-steel-600"
      >
        {label}
        {required && <span className="ml-1 text-navy-700">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-sm border border-steel-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-700 focus:ring-2 focus:ring-navy-200"
      />
    </div>
  );
}
