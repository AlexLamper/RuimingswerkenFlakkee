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
    slug: "dak-eraf-stad-aant-haringvliet",
    number: "01",
    title: "Dak gedemonteerd",
    location: "Stad aan 't Haringvliet",
    scope: "Sloopwerk",
    description:
      "Het dak van een huis volledig gedemonteerd. Na het opbouwen van een veilige steiger zijn de dakpannen, het isolatiemateriaal en de dakplaten verwijderd. Alle materialen zijn netjes in containers opgeruimd, waardoor de constructie volledig gereed was voor de verdere werkzaamheden.",
    result: "Dak volledig verwijderd en klaargemaakt voor verdere werkzaamheden.",
    photos: [
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/1.png",
        alt: "Het dak van een bijgebouw wordt gesloopt in Stad aan 't Haringvliet.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/2.jpg",
        alt: "Dakbedekking en beschot worden losgehaald tijdens het sloopwerk.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/3.jpg",
        alt: "Dakbalken worden stuk voor stuk verwijderd.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/4.jpg",
        alt: "Sloopmateriaal van het dak wordt naar beneden gebracht.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/5.jpg",
        alt: "Het dak wordt laag voor laag afgewerkt door meerdere man.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/6.jpg",
        alt: "Detail van het loshalen van dakbeschot en balken.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/7.jpg",
        alt: "Sloopafval van het dak gescheiden klaargezet voor afvoer.",
      },
      {
        src: "/images/projects/dak-eraf-stad-aant-haringvliet/8.png",
        alt: "Opgeruimde constructie nadat het dak volledig is verwijderd.",
      },
    ],
  },
  {
    slug: "muren-slopen-huis-stellendam",
    number: "02",
    title: "Muren gesloopt",
    location: "Stellendam",
    scope: "Sloop & verbouwing",
    description:
      "In een woning diverse muren gesloopt om voor te bereiden op een verbouwing. De muren zijn zorgvuldig verwijderd, waarbij waar nodig rekening is gehouden met de constructie. Daarnaast hebben we ook de bekisting rondom het beton verwijderd. Al het vuil hebben we opgeruimd in containers en de werkplek netjes achtergelaten, zodat de woning gereed was voor de volgende fase van de verbouwing.",
    result: "Muren verwijderd, bekisting verwijderd en volledige ruimte netjes gemaakt voor verdere werkzaamheden.",
    photos: [
      {
        src: "/images/projects/muren-slopen-huis-stellendam/2.jpg",
        alt: "Binnenmuur wordt gesloopt in een woning in Stellendam.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/2_2.jpg",
        alt: "Verder breekwerk aan de binnenmuur tijdens de interieursloop.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/3.jpg",
        alt: "Breekwerk aan een binnenmuur, puin verzamelt zich op de vloer.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/4.jpg",
        alt: "Sloop van binnenmuren om de indeling open te maken.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/5.jpg",
        alt: "Puin van de gesloopte muren wordt verzameld voor afvoer.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/6.jpg",
        alt: "Detail van het wegbreken van metselwerk.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/7.jpg",
        alt: "Geschoorde doorgang nadat een dragende muur deels is verwijderd.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/8.jpg",
        alt: "Sloopafval gescheiden klaargezet om afgevoerd te worden.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/8_2.jpg",
        alt: "Meer sloopafval verzameld en klaargezet voor afvoer.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/9.jpg",
        alt: "Open ruimte ontstaat nadat de binnenmuren zijn gesloopt.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/10.jpg",
        alt: "Puin wordt afgevoerd na het slopen van de muren.",
      },
      {
        src: "/images/projects/muren-slopen-huis-stellendam/11.jpg",
        alt: "Schone, open ruimte nadat de binnenmuren zijn verwijderd en het puin is afgevoerd.",
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
  {
    slug: "verbouwing-woning-ouddorp",
    number: "05",
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
    number: "06",
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
];
