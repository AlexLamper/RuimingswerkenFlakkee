import { projects } from "./projects";

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  location: string;
  scope: string;
};

export const heroEyebrow = "Recent uitgevoerd";

// Projecten 1 t/m 5 in de hero (woningontruiming valt erbuiten).
const HERO_PROJECTS = [
  "dak-eraf-stad-aant-haringvliet",
  "muren-slopen-huis-stellendam",
  "tuin-terrein-middelharnis",
  "fundering-schuur-middelharnis",
  "verbouwing-woning-ouddorp",
];

const heroProjects = HERO_PROJECTS.map((slug) =>
  projects.find((p) => p.slug === slug),
).filter((p): p is (typeof projects)[number] => Boolean(p));

const PHOTOS_PER_PROJECT = 2;

// Round-robin: per ronde 1 foto per klus, zodat de hero tussen projecten afwisselt.
export const heroSlides: HeroSlide[] = Array.from(
  { length: PHOTOS_PER_PROJECT },
  (_, round) =>
    heroProjects
      .map((project) => {
        const photo = project.photos[round];
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
