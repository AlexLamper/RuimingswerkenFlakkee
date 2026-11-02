import { Facebook, Instagram } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { company } from "@/data/company";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

// Lucide heeft geen TikTok-icoon; dit is het officiële logo als simpel pad.
function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
    </svg>
  );
}

const PLATFORMS: {
  key: keyof typeof company.socials;
  label: string;
  Icon: ComponentType<IconProps>;
}[] = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
];

type Props = {
  /** "light" voor lichte achtergronden, "dark" voor de footer. */
  variant?: "light" | "dark";
  className?: string;
};

/** Iconen naar onze sociale kanalen; platforms zonder URL worden overgeslagen. */
export function SocialLinks({ variant = "light", className = "" }: Props) {
  const links = PLATFORMS.filter(({ key }) => company.socials[key]);
  if (links.length === 0) return null;

  const style =
    variant === "dark"
      ? "border-navy-800 text-steel-300 hover:border-steel-400 hover:text-white"
      : "border-steel-200 text-navy-700 hover:border-navy-700 hover:bg-navy-50";

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={company.socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Volg ons op ${label}`}
            title={label}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border transition-colors ${style}`}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
