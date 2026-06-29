"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProjectPhoto } from "@/data/projects";

type Props = {
  photos: ProjectPhoto[];
  title: string;
};

/** Fotogalerij per klus: grote hoofdfoto + thumbnails + fullscreen lightbox. */
export function ProjectGallery({ photos, title }: Props) {
  const total = photos.length;
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const goTo = useCallback(
    (n: number) => setCurrent(((n % total) + total) % total),
    [total],
  );
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);
  const next = useCallback(() => goTo(current + 1), [goTo, current]);

  // Toetsenbordbediening + scroll-lock alleen in de lightbox.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, prev, next]);

  const active = photos[current];

  return (
    <div>
      {/* Hoofdfoto */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden border border-steel-200 bg-navy-950">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
          priority={current === 0}
        />

        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Foto vergroten"
          className="absolute inset-0 flex items-end justify-end p-3"
        >
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-navy-950/70 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Expand className="h-3.5 w-3.5" aria-hidden />
            Vergroten
          </span>
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Vorige foto"
              className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/20 bg-navy-950/55 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/85"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Volgende foto"
              className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/20 bg-navy-950/55 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/85"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-navy-950/65 px-2 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
              {current + 1} / {total}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {photos.map((photo, i) => {
            const isActive = i === current;
            return (
              <li key={photo.src}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1} tonen`}
                  aria-current={isActive}
                  className={`relative block aspect-square w-full overflow-hidden border bg-navy-950 transition ${
                    isActive
                      ? "border-navy-900 ring-2 ring-navy-900"
                      : "border-steel-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto's van ${title}`}
          className="fixed inset-0 z-50 flex flex-col bg-navy-950/95"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="text-sm font-medium">
              {title}
              <span className="ml-2 font-mono text-xs text-steel-400">
                {current + 1} / {total}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Sluiten"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-navy-950/60 text-white hover:bg-navy-950"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            {/* Scrollbare laag: korte foto's centreren, hoge foto's scrollen volledig in beeld. */}
            <div className="flex min-h-full w-full justify-center overflow-y-auto overflow-x-hidden px-3 py-2 sm:px-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                className="my-auto h-auto max-w-full object-contain"
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Vorige foto"
                  className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-navy-950/60 text-white hover:bg-navy-950 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Volgende foto"
                  className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-navy-950/60 text-white hover:bg-navy-950 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
