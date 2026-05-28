import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { mainNav } from "@/data/navigation";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-steel-200">
      <div className="mx-auto max-w-container px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-sm bg-white text-sm font-bold tracking-tight text-navy-900"
              >
                RF
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-semibold uppercase tracking-wide text-white">
                  Ruimingswerken
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-steel-300">
                  Flakkee
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-300">
              {company.slogan}. Actief in {company.region}.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigatie
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-steel-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Diensten
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/diensten"
                    className="text-steel-300 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-steel-400" aria-hidden />
                <a href={company.phoneHref} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-steel-400" aria-hidden />
                <a href={company.emailHref} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-steel-400" aria-hidden />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-navy-800 pt-6 text-xs text-steel-400 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. Alle rechten voorbehouden.
          </p>
          <p>{company.kvk}</p>
        </div>
      </div>
    </footer>
  );
}
