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
    title: "Slopen & afbreken",
    short:
      "Binnenwand, tegels, een schuurtje of aanbouw eruit - wij breken af en ruimen het puin op.",
    long: "Wij helpen met klein- en binnensloopwerk: een binnenwand eruit, tegels van de vloer, een schuurtje of aanbouw afbreken. Daar zijn we op ingericht - het puin voeren we netjes en gescheiden af.",
    icon: Hammer,
  },
  {
    slug: "demontage",
    title: "Demontage",
    short:
      "Een keuken, kasten, schutting of tuinhuisje uit elkaar halen en afvoeren.",
    long: "Moet er iets weg dat eerst uit elkaar moet? Denk aan een keuken, kasten, een schutting of een tuinhuisje - we halen het uit elkaar en voeren de onderdelen af. Technische installaties en elektra laten we aan vakmensen over; wij zijn de extra handen voor het stevige handwerk.",
    icon: Wrench,
  },
  {
    slug: "ontruimingen",
    title: "Ontruimen & leeghalen",
    short:
      "Woning, schuur, zolder of garage leeghalen - alles eruit en bezemschoon achter.",
    long: "Bij een verhuizing, opruiming of het leegmaken van een woning, schuur, zolder of garage: we dragen alles naar buiten, scheiden de stromen en leveren bezemschoon op. Altijd in overleg en met begrip voor de situatie.",
    icon: PackageOpen,
  },
  {
    slug: "beton-en-constructiesloop",
    title: "Vloeren & beton",
    short:
      "Tegelvloeren en lichtere betonvloeren opbreken en afvoeren.",
    long: "Een tegelvloer eruit of een lichtere betonvloer opbreken? Dat pakken we met handgereedschap aan en het puin voeren we af. Zware draag- en funderingsconstructies laten we aan gespecialiseerde sloopbedrijven over.",
    icon: Building2,
  },
  {
    slug: "terreinsanering",
    title: "Tuin & terrein opruimen",
    short:
      "Begroeiing, oud puin en rommel weghalen - tuin of terrein weer netjes.",
    long: "Een overwoekerde tuin, een vol achterterrein of een hoop oud materiaal: we ruimen op, halen begroeiing en puin weg en maken het terrein weer netjes en bruikbaar.",
    icon: Trees,
  },
  {
    slug: "afvoer-en-recycling",
    title: "Afvoer & opruimen",
    short:
      "Puin, hout, metaal en restafval gescheiden afvoeren naar erkende verwerkers.",
    long: "Alles wat vrijkomt nemen we mee: puin, hout, metaal, gips en restafval gaan gescheiden naar erkende verwerkers. Stortbonnen ontvangt u op verzoek.",
    icon: Recycle,
  },
];
