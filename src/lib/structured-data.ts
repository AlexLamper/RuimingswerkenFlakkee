import { company } from "@/data/company";
import { faqs } from "@/data/faq";
import { services } from "@/data/services";

const BASE = company.url;
const BUSINESS_ID = `${BASE}/#business`;
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;
const LOGO_URL = `${BASE}/icon.png`;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    ...(company.location.street
      ? { streetAddress: company.location.street }
      : {}),
    postalCode: company.location.postalCode,
    addressLocality: company.location.city,
    addressRegion: company.location.region,
    addressCountry: company.location.country,
  };
}

function areaServed() {
  return [
    { "@type": "AdministrativeArea", name: "Goeree-Overflakkee" },
    ...company.places.map((name) => ({ "@type": "City", name })),
  ];
}

function openingHours() {
  return company.openingHoursSpec.map((spec) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: spec.days,
    opens: spec.opens,
    closes: spec.closes,
  }));
}

/** LocalBusiness met diensten, werkgebied en NAP-gegevens. */
export function localBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": BUSINESS_ID,
    name: company.legalName,
    legalName: company.legalName,
    description: company.description,
    url: BASE,
    email: company.email,
    telephone: company.phoneHref.replace("tel:", ""),
    image: LOGO_URL,
    logo: LOGO_URL,
    priceRange: company.priceRange,
    currenciesAccepted: "EUR",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: areaServed(),
    openingHoursSpecification: openingHours(),
    ...(company.sameAs.length ? { sameAs: company.sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sloop- en ruimingswerkzaamheden",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          areaServed: { "@type": "AdministrativeArea", name: "Goeree-Overflakkee" },
          provider: { "@id": BUSINESS_ID },
        },
      })),
    },
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.legalName,
    url: BASE,
    logo: LOGO_URL,
    ...(company.sameAs.length ? { sameAs: company.sameAs } : {}),
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE,
    name: company.legalName,
    inLanguage: "nl-NL",
    publisher: { "@id": ORG_ID },
  };
}

/** Sitewide @graph: business + organisatie + website in één blok. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema(), organizationSchema(), websiteSchema()],
  };
}

/** BreadcrumbList op basis van een kruimelpad. */
export function breadcrumbSchema(crumbs: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href
        ? { item: `${BASE}${crumb.href === "/" ? "" : crumb.href}` }
        : {}),
    })),
  };
}

/** FAQPage voor de veelgestelde vragen. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
