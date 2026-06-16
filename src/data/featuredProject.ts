import { projects } from "./projects";

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  location: string;
  scope: string;
};

export const heroEyebrow = "Recent uitgevoerd";

// Volgorde in de hero: tuin & terrein eerst (mooiste foto's), daarna de rest.
const HERO_ORDER = ["tuin-terrein-middelharnis"];

const orderedProjects = [...projects].sort((a, b) => {
  const ai = HERO_ORDER.indexOf(a.slug);
  const bi = HERO_ORDER.indexOf(b.slug);
  return (ai === -1 ? HERO_ORDER.length : ai) - (bi === -1 ? HERO_ORDER.length : bi);
});

// 2 foto's per klus -> 6 slides die in de hero doorwisselen.
export const heroSlides: HeroSlide[] = orderedProjects.flatMap((project) =>
  project.photos.slice(0, 2).map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    title: project.title,
    location: project.location,
    scope: project.scope,
  })),
);
