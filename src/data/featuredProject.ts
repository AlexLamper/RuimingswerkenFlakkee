export type ProjectPhoto = {
  src: string;
  alt: string;
};

export const featuredProject = {
  eyebrow: "Dit project",
  title: "Sloop tegelvloer & binnenwand",
  subtitle: "Interieurontmanteling woning",
  location: "Goeree-Overflakkee",
  year: "2025",
  photos: [
    {
      src: "/images/1.jpeg",
      alt: "Drie vakmensen tijdens het verwijderen van een tegelvloer en het slopen van een binnenwand.",
    },
    {
      src: "/images/2.jpeg",
      alt: "Sloopwerk in volle gang: tegels en steenpuin op de vloer, wand wordt verwijderd.",
    },
    {
      src: "/images/3.jpeg",
      alt: "Detailbeeld van het slopen van wand en vloer in dezelfde ruimte.",
    },
    {
      src: "/images/4.jpeg",
      alt: "Tegels onder het raam worden losgehaald met daktrillers.",
    },
    {
      src: "/images/5.jpeg",
      alt: "Ontmantelde ruimte met houten plafondbalken zichtbaar en gesloopte vloer.",
    },
    {
      src: "/images/6.jpeg",
      alt: "Vervolgfase: wand wordt verder afgebroken, puin op de vloer.",
    },
  ] satisfies ProjectPhoto[],
} as const;
