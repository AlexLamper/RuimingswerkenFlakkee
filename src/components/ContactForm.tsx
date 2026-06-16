"use client";

// Bezorging via Web3Forms, rechtstreeks vanuit de browser (hun gratis plan
// staat alleen client-side submits toe). De access key is bedoeld om publiek
// te zijn - zie https://web3forms.com. Inzendingen komen binnen op het
// e-mailadres dat aan de key gekoppeld is.

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { company } from "@/data/company";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "ce39f9fb-6064-48a2-8c4a-997317ecd14b";

type RequestType = "offerte" | "vraag";

type FormState = {
  type: RequestType;
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const empty: FormState = {
  type: "offerte",
  name: "",
  phone: "",
  email: "",
  message: "",
};

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot ingevuld -> doe alsof het gelukt is, verstuur niets.
    if (botField) {
      setStatus("success");
      setForm(empty);
      return;
    }

    const onderwerp =
      form.type === "offerte" ? "Offerte aanvragen" : "Algemene vraag";

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
          access_key: WEB3FORMS_KEY,
          subject: `${onderwerp} - ${form.name}`,
          from_name: `${company.legalName} - website`,
          onderwerp,
          name: form.name,
          telefoon: form.phone || "-",
          // E-mail alleen meesturen als ingevuld (geldige reply-to).
          ...(form.email ? { email: form.email } : {}),
          bericht: form.message || "-",
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (res.ok && data?.success) {
        setStatus("success");
        setForm(empty);
        return;
      }

      setStatus("error");
      setErrorMsg(data?.message ?? "Er ging iets mis bij het verzenden.");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Verzenden is niet gelukt. Controleer uw internetverbinding en probeer het opnieuw.",
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
      <h2 className="text-xl font-semibold text-navy-900">Laat iets van u horen</h2>
      <p className="mt-2 text-sm leading-relaxed text-steel-600">
        Laat uw naam en telefoonnummer achter, dan bellen we u terug -
        doorgaans binnen één werkdag. Een bericht erbij mag, hoeft niet.
      </p>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wider text-steel-600">
          Waarvoor neemt u contact op?
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(
            [
              { value: "offerte", label: "Offerte aanvragen" },
              { value: "vraag", label: "Algemene vraag" },
            ] as const
          ).map((opt) => {
            const active = form.type === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center justify-center rounded-sm border px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-steel-300 bg-white text-steel-700 hover:border-navy-700"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={opt.value}
                  checked={active}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, type: opt.value }))
                  }
                  disabled={sending}
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Naam"
          required
          value={form.name}
          onChange={update("name")}
          disabled={sending}
        />
        <Field
          id="phone"
          label="Telefoon"
          type="tel"
          required
          value={form.phone}
          onChange={update("phone")}
          disabled={sending}
        />
        <Field
          id="email"
          label="E-mail (optioneel)"
          type="email"
          value={form.email}
          onChange={update("email")}
          className="sm:col-span-2"
          disabled={sending}
        />
        <TextareaField
          id="message"
          label="Bericht (optioneel)"
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder={
            form.type === "offerte"
              ? "Kort over het werk: locatie, omvang en gewenste planning."
              : "Waar kunnen we u mee helpen?"
          }
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
          Bedankt! Uw bericht is verzonden. We nemen zo snel mogelijk contact
          met u op.
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMsg}{" "}
          <a href={company.emailHref} className="font-semibold underline">
            Of mail ons direct
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
