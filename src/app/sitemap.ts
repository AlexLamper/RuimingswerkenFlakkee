import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { mainNav } from "@/data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return mainNav.map((item) => ({
    url: `${company.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
