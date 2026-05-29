export const company = {
  name: "RuimingswerkenFlakkee",
  legalName: "Ruimingswerken Flakkee",
  slogan: "Betrouwbaar in sloop en ruimingswerken",
  tagline:
    "Sloop, ruiming en demontage op Goeree-Overflakkee - vakwerk dat staat als een huis.",
  // Korte, zoekwoordrijke omschrijving voor metadata en structured data.
  description:
    "Sloopbedrijf op Goeree-Overflakkee voor sloopwerken, ruiming, ontruiming, demontage, betonsloop en terreinsanering. Vrijblijvende offerte, snelle service en netjes opgeleverd.",
  region: "Goeree-Overflakkee en omgeving",
  phone: "06 12 34 56 78",
  phoneHref: "tel:+31612345678",
  email: "info@ruimingswerkenflakkee.nl",
  emailHref: "mailto:info@ruimingswerkenflakkee.nl",
  location: {
    // LET OP: vul straat + huisnummer aan zodra bekend; een volledig adres
    // (NAP) versterkt de lokale SEO en Google Bedrijfsprofiel-koppeling.
    street: "",
    postalCode: "3241",
    city: "Middelharnis",
    region: "Zuid-Holland",
    country: "NL",
  },
  // Benaderde coördinaten van Middelharnis; pas aan naar het echte vestigingsadres.
  geo: {
    latitude: 51.7575,
    longitude: 4.1664,
  },
  priceRange: "€€",
  hours: [
    { day: "Maandag t/m zaterdag", time: "Op aanvraag" },
    { day: "Zondag", time: "Gesloten" },
  ],
  // Gestructureerde openingstijden voor schema.org (pas opens/closes aan naar wens).
  openingHoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  hoursNote:
    "Buiten reguliere uren vrijwel altijd bereikbaar - behalve op zondag.",
  kvk: "KvK in oprichting",
  url: "https://www.ruimingswerkenflakkee.nl",
  // Vul aan met echte profielen zodra beschikbaar (versterkt vindbaarheid/E-E-A-T).
  sameAs: [] as string[],
  // Kernen op Goeree-Overflakkee waar we actief zijn - gebruikt voor
  // werkgebied-content en areaServed in structured data.
  places: [
    "Middelharnis",
    "Sommelsdijk",
    "Dirksland",
    "Herkingen",
    "Melissant",
    "Stellendam",
    "Goedereede",
    "Ouddorp",
    "Oude-Tonge",
    "Nieuwe-Tonge",
    "Achthuisen",
    "Den Bommel",
    "Ooltgensplaat",
    "Stad aan 't Haringvliet",
  ],
} as const;
