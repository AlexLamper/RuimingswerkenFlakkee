// Generates web-ready logo assets from a transparent-background source PNG.
// For each logo folder it produces:
//   logo.png        - trimmed, resized, full color (for light backgrounds)
//   logo-white.png  - same shape recolored white (for dark backgrounds)
//
// Usage: node scripts/process-logo.mjs
import sharp from "sharp";
import path from "node:path";

const LOGO_DIR = "public/logo";
const MAX_WIDTH = 512; // downscale the 2000px sources for the web

// Which folder's logo also becomes the site favicon (src/app/icon.png).
const FAVICON_FROM = "logo1-rf";

const logos = [
  { dir: "logo1-rf", src: "source-transparent.png" },
];

async function buildVariants({ dir, src }) {
  const out = path.join(LOGO_DIR, dir);

  const { data, info } = await sharp(path.join(out, src))
    .trim()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const meta = { width: info.width, height: info.height, channels: info.channels };

  // White monochrome for dark backgrounds: recolor the mark to white, but knock
  // out bright interior pixels (white cutouts) so they read as negative space
  // instead of merging into a solid white blob.
  const white = Buffer.from(data);
  for (let i = 0; i < white.length; i += info.channels) {
    const lum =
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (lum > 190) {
      white[i + 3] = 0; // highlight -> transparent (negative space)
    } else {
      white[i] = 255;
      white[i + 1] = 255;
      white[i + 2] = 255;
    }
  }

  await sharp(data, { raw: meta })
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, "logo.png"));
  await sharp(white, { raw: meta })
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, "logo-white.png"));

  console.log(`${dir}: logo.png + logo-white.png (${info.width}x${info.height})`);
}

async function buildFavicon() {
  const S = 512;
  const pad = 90;
  const logo = await sharp(path.join(LOGO_DIR, FAVICON_FROM, "logo-white.png"))
    .resize({ width: S - pad * 2 })
    .toBuffer();
  const lm = await sharp(logo).metadata();
  await sharp({
    create: { width: S, height: S, channels: 4, background: "#0c2340" },
  })
    .composite([{ input: logo, left: pad, top: Math.round((S - lm.height) / 2) }])
    .png()
    .toFile("src/app/icon.png");
  console.log(`favicon: src/app/icon.png from ${FAVICON_FROM}`);
}

async function main() {
  for (const logo of logos) await buildVariants(logo);
  await buildFavicon();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
