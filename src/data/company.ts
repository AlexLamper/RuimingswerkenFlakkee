export const company = {
  name: "RuimingswerkenFlakkee",
  legalName: "Ruimingswerken Flakkee",
  slogan: "De helpende hand op Goeree-Overflakkee",
  tagline:
    "Sloop, ruiming en demontage op Goeree-Overflakkee - een jong, gedreven team dat de handen uit de mouwen steekt voor een eerlijke prijs.",
  // Korte positioneringszin: extra handjes voor een scherpe prijs.
  pitch:
    "Een jong team dat als extra handjes bijspringt waar het nodig is - van sloop tot opruimen, netjes en betaalbaar.",
  // Belangrijk: wij nemen bewust geen klussen met asbest aan.
  noAsbestos:
    "Klussen met asbest nemen wij bewust niet aan - voor uw en onze veiligheid verwijzen we daarvoor graag door naar een gecertificeerd asbestbedrijf.",
  // Korte, zoekwoordrijke omschrijving voor metadata en structured data.
  description:
    "Sloopbedrijf op Goeree-Overflakkee voor sloopwerken, ruiming, ontruiming, demontage, betonsloop en terreinsanering. Vrijblijvende offerte, snelle service en netjes opgeleverd.",
  region: "Goeree-Overflakkee en omgeving",
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
    "Op aanvraag vinden we vrijwel altijd een plekje - behalve op zondag.",
  kvk: "KvK in oprichting",
  url: "https://www.ruimingswerkenflakkee.nl",
  instagram: "https://www.instagram.com/ruimingswerkenflakkee",
  // Sociale profielen (versterkt vindbaarheid/E-E-A-T via sameAs).
  sameAs: ["https://www.instagram.com/ruimingswerkenflakkee"] as string[],
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
