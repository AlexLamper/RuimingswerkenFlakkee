"use client";

// Echte, gratis bezorging van het contactformulier via Web3Forms
// (https://web3forms.com) - geen backend of serverkosten nodig.
//
// EENMALIGE SETUP (gratis, ~1 minuut):
//   1. Ga naar https://web3forms.com en vul je ontvang-e-mailadres in.
//   2. Je krijgt direct een "access key" in je mailbox.
//   3. Zet die key in je environment als NEXT_PUBLIC_WEB3FORMS_KEY
//      (lokaal in .env.local en bij je hosting-provider). Zie .env.example.
//
// Zonder key valt het formulier automatisch terug op het openen van de
// mailclient van de bezoeker, zodat het nooit stuk is.

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { company } from "@/data/company";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const empty: FormState = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Honeypot: blijft leeg bij echte bezoekers; bots vullen 'm vaak wel.
  const [botField, setBotField] = useState("");

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const subject = () => `Offerteaanvraag van ${form.name || "website-bezoeker"}`;

  const openMailClient = () => {
    const body = [
      `Naam: ${form.name}`,
      `E-mail: ${form.email}`,
      `Telefoon: ${form.phone || "-"}`,
      "",
      "Bericht:",
      form.message,
    ].join("\n");
    const mailto = `${company.emailHref}?subject=${encodeURIComponent(
      subject(),
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("success");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Spam: honeypot ingevuld -> doe alsof het gelukt is, verstuur niets.
    if (botField) {
      setStatus("success");
      setForm(empty);
      return;
    }

    // Geen key geconfigureerd -> nette terugval op de mailclient.
    if (!ACCESS_KEY) {
      openMailClient();
      return;
    }

    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: subject(),
          from_name: `${company.legalName} - website`,
          name: form.name,
          email: form.email,
          telefoon: form.phone || "-",
          message: form.message,
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };
      if (data.success) {
        setStatus("success");
        setForm(empty);
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Er ging iets mis bij het verzenden.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Verzenden is niet gelukt. Controleer uw internetverbinding of bel ons gerust.",
      );
    }
  };

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-steel-200 bg-white p-7"
      aria-label="Contactformulier"
    >
      <h2 className="text-xl font-semibold text-navy-900">Stuur een bericht</h2>
      <p className="mt-2 text-sm leading-relaxed text-steel-600">
        Vul het formulier in en wij nemen zo snel mogelijk contact met u op -
        doorgaans binnen één werkdag.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Naam"
          required
          value={form.name}
          onChange={update("name")}
          disabled={sending}
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          disabled={sending}
        />
        <Field
          id="phone"
          label="Telefoon (optioneel)"
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          className="sm:col-span-2"
          disabled={sending}
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
          disabled={sending}
        />
      </div>

      {/* Honeypot - verborgen voor mensen, vaak ingevuld door bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Vul dit veld niet in</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Versturen...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Verstuur bericht
          </>
        )}
      </button>

      {status === "success" && (
        <p
          role="status"
          className="mt-4 border border-navy-200 bg-navy-50 px-4 py-3 text-sm text-navy-900"
        >
          {ACCESS_KEY
            ? "Bedankt! Uw bericht is verzonden. We nemen zo snel mogelijk contact met u op."
            : "Uw mailprogramma is geopend met het bericht. Klik daar nog op “verzenden” om het naar ons te sturen."}
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMsg}{" "}
          <a href={company.phoneHref} className="font-semibold underline">
            Of bel {company.phone}
          </a>
          .
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
  disabled?: boolean;
};

function Field({
  id,
  label,
  type = "text",
  required,
  value,
  onChange,
  className = "",
  disabled,
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
        disabled={disabled}
        className="mt-2 block w-full rounded-sm border border-steel-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-700 focus:ring-2 focus:ring-navy-200 disabled:bg-steel-50"
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
  disabled,
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
        disabled={disabled}
        className="mt-2 block w-full rounded-sm border border-steel-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-700 focus:ring-2 focus:ring-navy-200 disabled:bg-steel-50"
      />
    </div>
  );
}
