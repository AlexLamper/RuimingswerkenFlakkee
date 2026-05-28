"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredProject } from "@/data/featuredProject";

const AUTO_ADVANCE_MS = 5000;

export function HeroVisual() {
  const photos = featuredProject.photos;
  const total = photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  return (
    <section
      className="relative"
      aria-label="Recent uitgevoerd project"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className="mb-3 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-steel-300">
            {featuredProject.eyebrow}
          </p>
          <h2 className="mt-1.5 truncate text-base font-semibold tracking-tight text-white sm:text-lg">
            {featuredProject.title}
          </h2>
        </div>
        <p
          aria-live="polite"
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-steel-300"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1 text-steel-500">/</span>
          {String(total).padStart(2, "0")}
        </p>
      </header>

      <div className="relative aspect-[4/3] w-full overflow-hidden border border-navy-700/60 bg-navy-950 sm:aspect-[5/4] lg:aspect-[4/3]">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority={i === 0}
            quality={82}
            className={`object-cover transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/15" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-white/15 bg-navy-950/55 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:px-2.5 sm:py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Foto {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
          <p className="min-w-0 max-w-[65%] truncate text-xs font-medium text-white sm:text-sm">
            {featuredProject.subtitle} · {featuredProject.location}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={prev}
              aria-label="Vorige foto"
              className="inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-navy-950/55 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/80 sm:h-9 sm:w-9"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Volgende foto"
              className="inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-navy-950/55 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/80 sm:h-9 sm:w-9"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Foto navigatie"
        className="mt-3 flex items-center justify-center gap-2"
      >
        {photos.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Foto ${i + 1} van ${total}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active ? "w-8 bg-white" : "w-1.5 bg-steel-400/40 hover:bg-steel-300/70"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
