// Regenerates the site's logo assets from the client-supplied source at
// Source_Images/logo.jpeg. Re-run this if the client ever supplies an
// updated logo file.
//
//   node scripts/process-logo.mjs
//
// Produces (into public/images/logo/):
//   spotless-carpet-cleaning-logo.png     — compact mark (icon + wordmark,
//                                            no tagline), transparent
//                                            background, for the header
//                                            and footer nav lockup.
//   spotless-carpet-cleaning-logo-og.png  — full lockup (with tagline),
//                                            flattened onto white, for
//                                            Open Graph / Twitter / JSON-LD
//                                            (social platforms render
//                                            transparency as black).
import sharp from "sharp";

const SRC = "Source_Images/logo.jpeg";
const OUT_DIR = "public/images/logo";
const PAD = 24;

// Whiteness-based alpha key: turns the near-white backdrop transparent
// while keeping anti-aliased edges smooth (a soft ramp, not a hard cutout).
function keyOutWhite(buffer, low = 14, high = 50) {
  const out = Buffer.from(buffer);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const dist = (255 - maxC) + (maxC - minC);
    let alpha;
    if (dist <= low) alpha = 0;
    else if (dist >= high) alpha = 255;
    else alpha = Math.round(((dist - low) / (high - low)) * 255);
    out[i + 3] = alpha;
  }
  return out;
}

async function padAndKey(sharpInstance) {
  const { data, info } = await sharpInstance
    .ensureAlpha()
    .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const keyed = keyOutWhite(data);
  return sharp(keyed, { raw: { width: info.width, height: info.height, channels: 4 } });
}

async function run() {
  // Trim the large empty canvas down to the actual artwork, once, into a
  // real buffer we can safely reuse for two different crops.
  const trimmedBuffer = await sharp(SRC).trim({ threshold: 15 }).toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log("Trimmed artwork:", trimmedMeta.width, "x", trimmedMeta.height);

  // Full lockup (icon + "SPOTLESS" + "CARPET CLEANING" + tagline) — used
  // for the OG/social image.
  const fullPipeline = await padAndKey(sharp(trimmedBuffer));
  await fullPipeline
    .png()
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .toFile(`${OUT_DIR}/spotless-carpet-cleaning-logo-og.png`);

  // Compact mark (icon + "SPOTLESS" + "CARPET CLEANING", no tagline) —
  // used in the header/footer where the lockup only has ~40-48px of
  // height to work with; the tagline is illegible at that size anyway.
  // 345/381 is the proportion tuned visually against the reference crop
  // (345 keeps the full wordmark plus its underline rule with a safety
  // margin — 318 clipped the bottom few pixels of "CARPET CLEANING").
  const compactHeight = Math.round(trimmedMeta.height * (345 / 381));
  const compactSource = sharp(trimmedBuffer).extract({
    left: 0,
    top: 0,
    width: trimmedMeta.width,
    height: Math.min(compactHeight, trimmedMeta.height),
  });
  const compactPipeline = await padAndKey(compactSource);
  await compactPipeline.png().toFile(`${OUT_DIR}/spotless-carpet-cleaning-logo.png`);

  const finalFull = await sharp(`${OUT_DIR}/spotless-carpet-cleaning-logo-og.png`).metadata();
  const finalCompact = await sharp(`${OUT_DIR}/spotless-carpet-cleaning-logo.png`).metadata();
  console.log("Done:");
  console.log(" -", `${OUT_DIR}/spotless-carpet-cleaning-logo.png`, finalCompact.width, "x", finalCompact.height);
  console.log(" -", `${OUT_DIR}/spotless-carpet-cleaning-logo-og.png`, finalFull.width, "x", finalFull.height);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
