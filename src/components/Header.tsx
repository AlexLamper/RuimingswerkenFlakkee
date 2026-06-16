"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { company } from "@/data/company";
import { mainNav } from "@/data/navigation";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-steel-200 bg-white">
      <div className="hidden border-b border-steel-200 bg-navy-900 text-steel-100 lg:block">
        <div className="mx-auto flex h-9 max-w-container items-center justify-between px-6 text-xs">
          <span className="tracking-wide">
            Actief in {company.region}
          </span>
          <a
            href={company.emailHref}
            className="flex items-center gap-2 hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {company.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6 lg:h-20">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo/logo1-rf/logo.png"
            alt="Ruimingswerken Flakkee"
            width={512}
            height={307}
            priority
            className="h-9 w-auto lg:h-11"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold uppercase tracking-wide text-navy-900 lg:text-lg">
              Ruimingswerken
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-steel-500 lg:text-sm">
              Flakkee
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hoofdmenu">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-navy-50 text-navy-900"
                  : "text-steel-700 hover:bg-steel-50 hover:text-navy-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 inline-flex items-center gap-2 rounded-sm bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Offerte aanvragen
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-steel-200 text-navy-900 lg:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-steel-200 bg-white lg:hidden">
          <nav
            className="mx-auto flex max-w-container flex-col gap-1 px-6 py-4"
            aria-label="Mobiel menu"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-4 py-3 text-base font-medium ${
                  isActive(item.href)
                    ? "bg-navy-50 text-navy-900"
                    : "text-steel-700 hover:bg-steel-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm bg-navy-900 px-4 py-3 text-center text-base font-semibold text-white"
            >
              Offerte aanvragen
            </Link>
            <a
              href={company.emailHref}
              className="mt-1 flex items-center justify-center gap-2 rounded-sm border border-steel-200 px-4 py-3 text-sm font-medium text-navy-900"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Mail ons
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
