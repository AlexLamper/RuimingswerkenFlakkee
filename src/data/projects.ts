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
      "Voor een verbouwing hebben we de woonkamer compleet ontmanteld: tegelvloer eruit, een binnenwand gesloopt en alle puin afgevoerd. Met meerdere man tegelijk ging het hakken, scheppen en sjouwen lekker door, zodat de ruimte in één keer kaal was. Tegels, steen en gruis hebben we netjes gescheiden afgevoerd, zodat de bewoner meteen verder kon met de opbouw.",
    result: "Ruimte bezemschoon en klaar voor de verbouwing - puin netjes afgevoerd.",
    photos: [
      {
        src: "/images/projects/verbouwing-woning-ouddorp/1.jpeg",
        alt: "Drie jongens slopen samen een tegelvloer en binnenwand tijdens een woningverbouwing in Ouddorp.",
      },
      {
        src: "/images/projects/verbouwing-woning-ouddorp/2.jpeg",
        alt: "Tegelvloer wordt opgebroken, puin verzamelt zich op de vloer.",
      },
      {
        src: "/images/projects/verbouwing-woning-ouddorp/3.jpeg",
        alt: "Binnenwand wordt afgebroken tijdens de interieursloop.",
      },
      {
        src: "/images/projects/verbouwing-woning-ouddorp/4.jpeg",
        alt: "Detail van het loshalen van tegels met handgereedschap.",
      },
      {
        src: "/images/projects/verbouwing-woning-ouddorp/5.jpeg",
        alt: "Ontmantelde woonkamer met houten plafondbalken zichtbaar.",
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
      "Een rijtjeswoning compleet leeggehaald: meubels, kasten en restspullen naar buiten gedragen, ingeladen en afgevoerd. Het zware tilwerk en de trappen namen we volledig uit handen, zodat de bewoners zich nergens druk om hoefden te maken. Wat nog bruikbaar was hebben we apart gehouden, de rest is gescheiden naar de juiste plek gebracht.",
    result: "Woning leeg en bezemschoon opgeleverd op de afgesproken dag.",
    photos: [
      {
        src: "/images/projects/woningontruiming-middelharnis/1.jpeg",
        alt: "Jongen draagt een kast naar buiten bij het leeghalen van een rijtjeswoning in Middelharnis.",
      },
      {
        src: "/images/projects/woningontruiming-middelharnis/2.jpeg",
        alt: "Meubels en spullen worden uit de woning gedragen en klaargezet voor afvoer.",
      },
      {
        src: "/images/projects/woningontruiming-middelharnis/3.jpeg",
        alt: "Inladen van inboedel tijdens de woningontruiming.",
      },
      {
        src: "/images/projects/woningontruiming-middelharnis/4.jpeg",
        alt: "Verhuisdozen en restspullen klaar om afgevoerd te worden.",
      },
    ],
  },
  {
    slug: "tuin-terrein-middelharnis",
    number: "03",
    title: "Terrein opgehoogd langs het water",
    location: "Middelharnis",
    scope: "Grondwerk",
    description:
      "Een achterterrein langs het water moest worden opgehoogd om te voorkomen dat de schuur richting het water zou wegzakken. Met kruiwagens hebben we grond verplaatst en aangebracht op de plekken die extra versteviging nodig hadden. Zo staat de schuur weer stevig en hoeft de eigenaar zich geen zorgen meer te maken dat de grond wegzakt.",
    result: "Schuur weer stevig - geen risico meer dat de grond wegzakt.",
    photos: [
      {
        src: "/images/projects/tuin-terrein-middelharnis/1.jpeg",
        alt: "Vier jongens hogen met kruiwagens en schoppen een achterterrein langs het water op in Middelharnis.",
      },
      {
        src: "/images/projects/tuin-terrein-middelharnis/2.jpeg",
        alt: "Grond wordt met de kruiwagen verplaatst en aangebracht om het terrein te verstevigen.",
      },
    ],
  },
  {
    slug: "fundering-schuur-middelharnis",
    number: "04",
    title: "Betonnen fundering gesloopt",
    location: "Middelharnis",
    scope: "Betonsloop",
    description:
      "De betonnen fundering van een oude schuur eruit gesloopt en helemaal opgeruimd. Met breekwerk hebben we het beton in stukken gehaald, de brokken in de container geladen en afgevoerd. Wat overbleef was een schoon, vlak terrein - klaar voor wat er ook komt.",
    result: "Fundering verwijderd en terrein klaargemaakt voor de volgende stap.",
    photos: [
      {
        src: "/images/projects/fundering-schuur-middelharnis/1.jpeg",
        alt: "Het terrein naast de schuur is leeg en vlak nadat de betonnen fundering is verwijderd in Middelharnis.",
      },
      {
        src: "/images/projects/fundering-schuur-middelharnis/2.jpeg",
        alt: "Container vol gesloopt betonpuin naast de schuur, brokken van de oude fundering opgestapeld.",
      },
    ],
  },
];
