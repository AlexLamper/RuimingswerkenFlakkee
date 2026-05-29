export type Project = {
  number: string;
  title: string;
  location: string;
  scope: string;
  description: string;
  result: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Sloop oude schuur",
    location: "Middelharnis",
    scope: "Sloopwerken",
    description:
      "Vrijstaande houten schuur van circa 90 m² compleet gesloopt. Stromen gescheiden afgevoerd, fundering verwijderd.",
    result: "Erf bezemschoon opgeleverd binnen drie werkdagen.",
  },
  {
    number: "02",
    title: "Ontruiming bedrijfspand",
    location: "Sommelsdijk",
    scope: "Ontruimingen",
    description:
      "Bedrijfspand van ruim 400 m² na faillissement volledig leeggehaald: kantoorinventaris, machines en restmateriaal afgevoerd.",
    result: "Pand klaar voor nieuwe huurder na één werkweek.",
  },
  {
    number: "03",
    title: "Betonvloer verwijdering",
    location: "Goedereede",
    scope: "Beton- en constructiesloop",
    description:
      "Gewapende betonvloer van 180 m² in voormalige loods opgebroken en afgevoerd, inclusief funderingsbalken aan de randen.",
    result: "Vloer verwijderd, grond gelijk afgewerkt voor nieuwbouw.",
  },
  {
    number: "04",
    title: "Demontage staalconstructie",
    location: "Ouddorp",
    scope: "Demontage",
    description:
      "Stalen kasconstructie van een agrarisch bedrijf elementsgewijs gedemonteerd zodat hergebruik op locatie elders mogelijk bleef.",
    result: "Constructie compleet en transportgereed opgeleverd.",
  },
  {
    number: "05",
    title: "Terreinsanering perceel",
    location: "Stellendam",
    scope: "Terreinsanering",
    description:
      "Verwilderd perceel van bijna een halve hectare ontdaan van opstallen, begroeiing en oud puin. Stromen gescheiden afgevoerd.",
    result: "Kavel vlakgemaakt en klaar voor verkoop.",
  },
];
