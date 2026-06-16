import { Camera } from "lucide-react";

type Props = {
  /**
   * Zet hier het pad zodra de groepsfoto er is, bijv. "/images/team.jpeg".
   * Zolang dit leeg is, tonen we een nette placeholder.
   */
  src?: string;
  alt?: string;
  className?: string;
};

/**
 * Groepsfoto van het team. Vervang de placeholder door de echte foto:
 * geef `src` (en `alt`) mee zodra de teamfoto in /public/images staat.
 */
export function TeamPhoto({ src, alt, className = "" }: Props) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? "Het team van Ruimingswerken Flakkee"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 border border-dashed border-steel-300 bg-steel-50 p-6 text-center ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-900 text-white">
        <Camera className="h-5 w-5" aria-hidden />
      </span>
      <p className="text-sm font-semibold text-navy-900">Teamfoto komt eraan</p>
      <p className="max-w-xs text-xs leading-relaxed text-steel-600">
        Binnenkort vindt u hier de groepsfoto van het team.
      </p>
    </div>
  );
}
