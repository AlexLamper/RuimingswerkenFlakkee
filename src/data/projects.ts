export type ProjectPhoto = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  location: string;
  scope: string;
  description: string;
  result: string;
  photos: ProjectPhoto[];
};

// Echte, uitgevoerde klussen - per klus gegroepeerd met eigen foto's.
export const projects: Project[] = [
  {
    slug: "verbouwing-woning-ouddorp",
    number: "01",
    title: "Verbouwing woning",
    location: "Ouddorp",
    scope: "Sloop & verbouwing",
    description:
      "Voor een verbouwing hebben we de woonkamer compleet ontmanteld: tegelvloer eruit, een binnenwand gesloopt en alle puin afgevoerd. Zo lag de ruimte klaar om opnieuw op te bouwen.",
    result: "Ruimte bezemschoon en klaar voor de verbouwing - puin netjes afgevoerd.",
    photos: [
      {
        src: "/images/ouddorp_klus1_1.jpeg",
        alt: "Drie jongens slopen samen een tegelvloer en binnenwand tijdens een woningverbouwing in Ouddorp.",
      },
      {
        src: "/images/ouddorp_klus1_2.jpeg",
        alt: "Tegelvloer wordt opgebroken, puin verzamelt zich op de vloer.",
      },
      {
        src: "/images/ouddorp_klus1_3.jpeg",
        alt: "Binnenwand wordt afgebroken tijdens de interieursloop.",
      },
      {
        src: "/images/ouddorp_klus1_4.jpeg",
        alt: "Detail van het loshalen van tegels met handgereedschap.",
      },
      {
        src: "/images/ouddorp_klus1_5.jpeg",
        alt: "Ontmantelde woonkamer met houten plafondbalken zichtbaar.",
      },
      {
        src: "/images/ouddorp_klus1_6.jpeg",
        alt: "Vervolgfase van de sloop: wand verder afgebroken, puin klaar voor afvoer.",
      },
    ],
  },
  {
    slug: "woningontruiming-middelharnis",
    number: "02",
    title: "Woning leeggehaald",
    location: "Middelharnis",
    scope: "Ontruiming",
    description:
      "Een rijtjeswoning compleet leeggehaald: meubels, kasten en restspullen naar buiten gedragen, ingeladen en afgevoerd. Een paar extra handjes die het zware werk uit handen nemen.",
    result: "Woning leeg en bezemschoon opgeleverd op de afgesproken dag.",
    photos: [
      {
        src: "/images/middelharnis_klus1_1.jpeg",
        alt: "Jongen draagt een kast naar buiten bij het leeghalen van een rijtjeswoning in Middelharnis.",
      },
      {
        src: "/images/middelharnis_klus1_2.jpeg",
        alt: "Meubels en spullen worden uit de woning gedragen en klaargezet voor afvoer.",
      },
      {
        src: "/images/middelharnis_klus1_3.jpeg",
        alt: "Inladen van inboedel tijdens de woningontruiming.",
      },
      {
        src: "/images/middelharnis_klus1_4.jpeg",
        alt: "Verhuisdozen en restspullen klaar om afgevoerd te worden.",
      },
    ],
  },
  {
    slug: "tuin-terrein-middelharnis",
    number: "03",
    title: "Tuin & terrein opgeruimd",
    location: "Middelharnis",
    scope: "Tuin & terrein",
    description:
      "Een overwoekerd achterterrein weer netjes gemaakt: begroeiing weggehaald, grond geëgaliseerd en al het groenafval afgevoerd met kruiwagen en schop.",
    result: "Terrein vlak en opgeruimd, klaar voor nieuwe invulling.",
    photos: [
      {
        src: "/images/middelharnis_klus2_1.jpeg",
        alt: "Vier jongens ruimen met schoffels en een kruiwagen een overwoekerd achterterrein in Middelharnis op.",
      },
      {
        src: "/images/middelharnis_klus2_2.jpeg",
        alt: "Begroeiing en groenafval worden verzameld en het terrein wordt geëgaliseerd.",
      },
    ],
  },
];
