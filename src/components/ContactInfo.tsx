import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";

export function ContactInfo() {
  return (
    <div className="border border-steel-200 bg-white p-7">
      <h2 className="text-xl font-semibold text-navy-900">Direct contact</h2>
      <p className="mt-2 text-sm leading-relaxed text-steel-600">
        Liever even bellen of mailen? Geen probleem. We staan u graag te woord.
      </p>

      <dl className="mt-6 space-y-5 text-sm">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
              Telefoon
            </dt>
            <dd className="mt-1">
              <a
                href={company.phoneHref}
                className="text-base font-medium text-navy-900 hover:underline"
              >
                {company.phone}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 flex-none text-navy-700" aria-hidden />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
              E-mail
            </dt>
            <dd className="mt-1">
              <a
                href={company.emailHref}
                className="text-base font-medium text-navy-900 hover:underline"
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
              Vestiging
            </dt>
            <dd className="mt-1 text-base font-medium text-navy-900">
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
            </dd>
            <p className="mt-1 text-sm text-steel-600">
              Werkgebied: {company.region}
            </p>
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
                <div key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="font-medium text-navy-900">{h.time}</span>
                </div>
              ))}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
