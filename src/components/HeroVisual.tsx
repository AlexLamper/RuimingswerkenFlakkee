import { ImageIcon } from "lucide-react";

/**
 * Hero afbeelding-placeholder.
 *
 * Vervang het binnenste placeholder-blok door een echte foto wanneer
 * beschikbaar. Aanbevolen: ratio 4:5, minimaal 1200×1500 px, .webp of .jpg.
 * Voorbeeld:
 *
 *   <Image
 *     src="/foto/hero-sloop.jpg"
 *     alt="Sloopwerken bedrijfspand Sommelsdijk"
 *     fill
 *     priority
 *     className="object-cover"
 *   />
 */
export function HeroVisual() {
  return (
    <figure className="relative" aria-hidden>
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-navy-700/60 bg-gradient-to-br from-navy-800 to-navy-950">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 12px)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-steel-400/30 bg-navy-900/40">
            <ImageIcon className="h-7 w-7 stroke-[1.25] text-steel-300" />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-steel-200">
            Hero afbeelding
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-steel-500">
            1200 × 1500 px
          </p>
        </div>

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-steel-400/30 bg-navy-900/70 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-200 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Foto 01
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-steel-400/25 bg-navy-950/85 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-semibold tracking-tight text-white">
            Sloop bedrijfspand
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-300">
            Sommelsdijk · 2025
          </p>
        </div>
      </div>
    </figure>
  );
}
