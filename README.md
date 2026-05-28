# RuimingswerkenFlakkee

Bedrijfswebsite voor **RuimingswerkenFlakkee** — sloop, ruiming en demontage op Goeree-Overflakkee.

Volledig statische Next.js website (App Router, TypeScript, Tailwind CSS). Geen backend, geen externe API's. Direct deploybaar op Vercel.

## Aan de slag

```bash
npm install
npm run dev
```

De site draait dan op [http://localhost:3000](http://localhost:3000).

## Beschikbare scripts

| Script | Omschrijving |
| --- | --- |
| `npm run dev` | Start de development server op poort 3000 |
| `npm run build` | Maak een productie-build |
| `npm run start` | Start de productie-build lokaal |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript controle zonder build |

## Projectstructuur

```
src/
├── app/                # Next.js App Router pagina's
│   ├── layout.tsx      # Globale layout (header + footer)
│   ├── page.tsx        # Homepage
│   ├── diensten/       # /diensten
│   ├── over-ons/       # /over-ons
│   ├── projecten/      # /projecten
│   └── contact/        # /contact
├── components/         # Herbruikbare UI-componenten
└── data/               # Statische bedrijfsdata (services, projecten, etc.)
```

## Bedrijfsdata aanpassen

Alle inhoud die regelmatig wijzigt staat in `src/data/`:

- `company.ts` — naam, slogan, telefoon, e-mail, regio
- `services.ts` — lijst diensten
- `projects.ts` — referentieprojecten
- `navigation.ts` — menu-items

Pas deze bestanden aan om teksten te wijzigen — geen aanpassingen aan componenten nodig.

## Contactformulier

Het formulier op `/contact` opent bij verzenden de standaard mailclient van de bezoeker met naam, e-mail en bericht ingevuld. Werkt overal, kost niets, geen externe service.

**Optionele upgrade** naar server-side bezorging (ook gratis): vervang in `src/components/ContactForm.tsx` de `mailto:` handler door een POST naar [Web3Forms](https://web3forms.com/). Zie de comment bovenaan dat bestand voor exacte instructies.

## Deployen

### Vercel (aanbevolen)

1. Push de repo naar GitHub.
2. Importeer in [vercel.com/new](https://vercel.com/new).
3. Klaar — geen environment variables nodig.

### GitHub Pages

Voeg `output: 'export'` toe aan `next.config.mjs`, run `npm run build` en publiceer de `out/` map.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) (iconen)
