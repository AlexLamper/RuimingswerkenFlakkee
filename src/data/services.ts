import {
  Building2,
  Hammer,
  PackageOpen,
  Recycle,
  Trees,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "sloopwerken",
    title: "Sloopwerken",
    short:
      "Compleet of selectief slopen van woningen, schuren en bedrijfspanden — netjes en volgens de regels.",
    long: "Van een enkele bijgebouw tot een volledig pand: we slopen veilig, gefaseerd en met respect voor de omgeving. Inclusief asbestinventarisatie indien nodig en correcte afvoer van alle stromen.",
    icon: Hammer,
  },
  {
    slug: "demontage",
    title: "Demontage",
    short:
      "Vakkundig demonteren van installaties, constructies en interieurs — zonder onnodige schade.",
    long: "Wanneer hergebruik of behoud van het casco belangrijk is, demonteren we elementsgewijs. Denk aan staalconstructies, machines, kantoorinterieurs en technische installaties.",
    icon: Wrench,
  },
  {
    slug: "ontruimingen",
    title: "Ontruimingen",
    short:
      "Snelle, discrete ontruiming van woningen, bedrijfspanden en loodsen — bezem­schoon opgeleverd.",
    long: "Bij verhuizing, overlijden, faillissement of einde huurperiode: we halen alles weg, scheiden de stromen en leveren bezemschoon op. Altijd in overleg en met begrip voor de situatie.",
    icon: PackageOpen,
  },
  {
    slug: "beton-en-constructiesloop",
    title: "Beton- en constructiesloop",
    short:
      "Doorzagen, breken en verwijderen van betonvloeren, funderingen en draagconstructies.",
    long: "Met de juiste machines pakken we beton, gewapend beton en zware constructies aan. Trillingsarm waar dat moet, krachtig waar dat kan — en altijd met een veilig werkterrein.",
    icon: Building2,
  },
  {
    slug: "terreinsanering",
    title: "Terreinsanering & ruiming",
    short:
      "Begroeiing, puin, oude opstallen en zwerfafval weghalen — terrein klaar voor nieuwe invulling.",
    long: "Verwilderde percelen, oude erfopstallen of een terrein vol restmateriaal: we ruimen, vlakken af en maken het kavel klaar voor verkoop, nieuwbouw of agrarisch gebruik.",
    icon: Trees,
  },
  {
    slug: "afvoer-en-recycling",
    title: "Afvoer & recycling",
    short:
      "Gescheiden afvoer van bouw- en sloopafval — zo veel mogelijk terug de keten in.",
    long: "Alles wat vrijkomt wordt gescheiden aangeleverd bij erkende verwerkers: puin, hout, metaal, gips, dakbedekking en restafval. U ontvangt de stortbonnen op verzoek.",
    icon: Recycle,
  },
];
