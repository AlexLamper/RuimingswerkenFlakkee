import { Clock, Instagram, Mail, MapPin } from "lucide-react";
import { company } from "@/data/company";

export function ContactInfo() {
  return (
    <div className="border border-steel-200 bg-white p-6 sm:p-7">
      <h2 className="text-xl font-semibold text-navy-900">Direct contact</h2>
      <p className="mt-2 text-sm leading-relaxed text-steel-600">
        Mail ons gerust - we vinden het juist leuk om mee te denken en
        reageren snel. Eén berichtje is genoeg om te beginnen.
      </p>

      <dl className="mt-6 space-y-5 text-sm">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
          <div className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
              E-mail
            </dt>
            <dd className="mt-1">
              <a
                href={company.emailHref}
                className="break-all text-base font-medium text-navy-900 hover:underline"
              >
                {company.email}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
              Werkgebied
            </dt>
            <dd className="mt-1 text-base font-medium text-navy-900">
              {company.region}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
          <div className="flex-1">
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
              Openingstijden
            </dt>
            <dd className="mt-1 space-y-1 text-sm text-steel-700">
              {company.hours.map((h) => (
                <div
                  key={h.day}
                  className="flex flex-wrap justify-between gap-x-4 gap-y-0.5"
                >
                  <span>{h.day}</span>
                  <span className="font-medium text-navy-900">{h.time}</span>
                </div>
              ))}
            </dd>
            <p className="mt-3 text-xs leading-relaxed text-steel-600">
              {company.hoursNote}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Instagram className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
              Social media
            </dt>
            <dd className="mt-1.5">
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Volg ons op Instagram"
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-steel-200 text-navy-700 transition-colors hover:border-navy-700 hover:bg-navy-50"
              >
                <Instagram className="h-4 w-4" aria-hidden />
              </a>
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
