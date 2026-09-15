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
    slug: "verbouwing-woning-ouddorp",
    number: "03",
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
    slug: "grind-van-dak-halen",
    number: "04",
    title: "Grind van plat dak gehaald",
    location: "Goeree-Overflakkee",
    scope: "Dakwerk",
    description:
      "Al het grind van een plat dak geschept en via een buis naar beneden gebracht. Daarna het dak schoongespoten.",
    result: "Dak leeg en schoon.",
    photos: [
      {
        src: "/images/projects/grind-van-dak-halen/f1330ad9-a2aa-48ce-90aa-40917420133a.jpg",
        alt: "Plat dak vol grind voordat het werk begint.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/b948e29e-87ff-4bed-8f36-5265e9bae35d.jpg",
        alt: "Grind wordt van het platte dak in emmers geschept.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/06c47098-4fb1-4dd7-8637-065ac6aa597f.jpg",
        alt: "Grind scheppen op het platte dak.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/243bebb5-708c-4702-ad0e-f8b761147604.jpg",
        alt: "Emmer grind wordt in een buis naar beneden gestort.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/a2a047ec-6c3b-4ec6-b66e-a970b3a32959.jpg",
        alt: "Buis vanaf het dak laat het grind in een kruiwagen lopen.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/8a044634-ceaa-40f3-baf8-dbba5ea621b0.jpg",
        alt: "Dak bijna leeg, laatste grind in emmers.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/5d6dd0a1-013f-4ae9-a5d0-25e607c45e9c.jpg",
        alt: "Het lege dak wordt schoongespoten.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/bd2bd3fe-4d46-4ba6-a7f1-2139648085d7.jpg",
        alt: "Schoon plat dak zonder grind.",
      },
      {
        src: "/images/projects/grind-van-dak-halen/2a604b80-250f-438c-ba7a-d9f397abef23.jpg",
        alt: "Ander zicht op het schone, lege dak.",
      },
    ],
  },
  {
    slug: "vloer-tegels-eruit-woning",
    number: "05",
    title: "Tegelvloer verwijderd",
    location: "Oosterland",
    scope: "Sloopwerk",
    description:
      "In een woning de complete tegelvloer eruit gehaald - in de gang, de hal bij de voordeur, het toilet en de kamers. Met breekhamers hebben we de tegels losgehakt, ook langs de muren en in de krappe hoeken. Het puin is met kruiwagens naar buiten gebracht en afgevoerd, zodat de ondervloer kaal en klaar was voor een nieuwe vloer.",
    result: "Tegels volledig verwijderd en ondervloer klaar voor de nieuwe vloer.",
    photos: [
      {
        src: "/images/projects/vloer-tegels-eruit-woning/80217aec-a3f8-484d-8f03-eafe24fc68d0.jpg",
        alt: "Tegelvloer wordt met een breekhamer losgehakt langs een bakstenen muur in een woning in Oosterland.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/7c67ca83-d70e-4445-b48f-488431e4b567.jpg",
        alt: "Tegels worden langs de plint en deurpost weggebroken.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/048b1621-1483-4bd7-a4f6-69889564cf03.jpg",
        alt: "Breekwerk aan de tegelvloer in de gang, gebroken tegels verzamelen zich op de vloer.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/7ed0b77e-15b1-4797-b87b-9196246973a6.jpg",
        alt: "Tegels worden in een hoek van de hal losgehakt.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/cb1f0127-88ba-4ba0-a36f-42dedb495349.jpg",
        alt: "Laatste tegelresten worden in een smalle gang weggehakt.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/d8476646-0e85-4d10-b421-1d1a787bd581.jpg",
        alt: "Tegelvloer wordt voor de deur van het toilet verwijderd.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/60112e15-ef04-4232-ab89-e7ac0c188de2.jpg",
        alt: "Tegels worden tot in de hoek van een kamer losgebroken.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/115d4ddb-a266-42ce-9d28-3410ca9dcaae.jpg",
        alt: "Hal bij de voordeur vol gebroken tegels, puin wordt met de kruiwagen afgevoerd.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/ad52967b-cf7f-468b-b333-773409527128.jpg",
        alt: "Overzicht van de hal met tegelpuin en kruiwagen tijdens het sloopwerk.",
      },
      {
        src: "/images/projects/vloer-tegels-eruit-woning/c0396000-3f20-474f-a53d-7bc8c45be1cd.jpg",
        alt: "Kale ondervloer nadat alle tegels zijn verwijderd.",
      },
    ],
  },
  {
    slug: "tuinhuisje-slopen-ouddorp",
    number: "06",
    title: "Tuinhuisje gesloopt",
    location: "Ouddorp",
    scope: "Sloopwerk",
    description:
      "Een houten tuinhuisje gesloopt en het hout met de aanhanger afgevoerd.",
    result: "Tuinhuisje weg, plek netjes leeg.",
    photos: [
      {
        src: "/images/projects/tuinhuisje-slopen-ouddorp/2b6dabea-1cd3-44a4-9c04-01d53622db9b-2.jpg",
        alt: "Het dak van een houten tuinhuisje wordt gesloopt in Ouddorp.",
      },
      {
        src: "/images/projects/tuinhuisje-slopen-ouddorp/99e21b8d-2b31-4d81-859f-b2c44a993f17.jpg",
        alt: "Aanhanger vol sloophout van het tuinhuisje.",
      },
      {
        src: "/images/projects/tuinhuisje-slopen-ouddorp/6dbe2079-785a-4041-96c1-5580aaef1afe.jpg",
        alt: "Sloophout op de aanhanger klaar voor afvoer.",
      },
      {
        src: "/images/projects/tuinhuisje-slopen-ouddorp/4b9e417e-438d-4133-b8f0-1a375d997f05.jpg",
        alt: "Lege plek in de tuin waar het tuinhuisje stond.",
      },
    ],
  },
  {
    slug: "tuin-terrein-middelharnis",
    number: "07",
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
    number: "08",
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
    slug: "woningontruiming-middelharnis",
    number: "09",
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
