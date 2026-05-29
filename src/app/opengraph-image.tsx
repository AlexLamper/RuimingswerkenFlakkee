import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Social-share afbeelding (Open Graph / Twitter). Next.js serveert deze
// automatisch als og:image en twitter:image voor de hele site.
export const alt =
  "Ruimingswerken Flakkee - sloop, ruiming en demontage op Goeree-Overflakkee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = readFileSync(
  join(process.cwd(), "public/logo/logo1-rf/logo-white.png"),
);
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #0c2340 0%, #0a1c33 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} height={150} alt="" />
        <div
          style={{
            marginTop: 56,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          Sloop · Ruiming · Demontage
        </div>
        <div style={{ marginTop: 20, fontSize: 40, color: "#9fb3c8" }}>
          Sloopbedrijf op Goeree-Overflakkee
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 30,
            color: "#cdd9e5",
            letterSpacing: 1,
          }}
        >
          ruimingswerkenflakkee.nl
        </div>
      </div>
    ),
    { ...size },
  );
}
