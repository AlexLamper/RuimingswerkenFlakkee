import { projects } from "./projects";

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  location: string;
  scope: string;
};

export const heroEyebrow = "Recent uitgevoerd";

const PHOTOS_PER_PROJECT = 2;

// Projecten in de hero (oudere klussen vallen erbuiten).
// Optioneel `photos` om minder foto's van een klus te tonen.
const HERO_PROJECTS: { slug: string; photos?: number }[] = [
  { slug: "schuur-binnenkant-demonteren" },
  { slug: "materiaalstelling-opbouwen" },
  { slug: "klusjes-woning" },
  { slug: "dak-eraf-stad-aant-haringvliet" },
  { slug: "muren-slopen-huis-stellendam" },
  { slug: "grind-van-dak-halen" },
];

const heroProjects = HERO_PROJECTS.flatMap(({ slug, photos }) => {
  const project = projects.find((p) => p.slug === slug);
  return project ? [{ project, limit: photos ?? PHOTOS_PER_PROJECT }] : [];
});

// Round-robin: per ronde 1 foto per klus, zodat de hero tussen projecten afwisselt.
export const heroSlides: HeroSlide[] = Array.from(
  { length: PHOTOS_PER_PROJECT },
  (_, round) =>
    heroProjects
      .map(({ project, limit }) => {
        const photo = round < limit ? project.photos[round] : undefined;
        if (!photo) return null;
        return {
          src: photo.src,
          alt: photo.alt,
          title: project.title,
          location: project.location,
          scope: project.scope,
        };
      })
      .filter((slide): slide is HeroSlide => slide !== null),
).flat();
