import type { MetadataRoute } from "next";
import { company } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.legalName} - sloop & ruimingswerken Goeree-Overflakkee`,
    short_name: "Ruimingswerken Flakkee",
    description: company.description,
    start_url: "/",
    display: "standalone",
    lang: "nl-NL",
    background_color: "#0c2340",
    theme_color: "#0c2340",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
