import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('./screenshot-manifest.json', import.meta.url), 'utf8'));
// Identical Portuguese language artwork is allowed across the two regional routes.
// Other cross-language duplicates need a human check; this is not OCR/language detection.
const allowed = new Set(['pt,pt-br']);
const groups = new Map();
for (const asset of Object.values(manifest.assets)) {
  const key = `${asset.view}:${asset.pixelSha256}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(asset);
}
let warnings = 0;
for (const assets of groups.values()) {
  if (assets.length < 2) continue;
  const locales = assets.map(asset => asset.locale).sort().join(',');
  if (allowed.has(locales)) continue;
  warnings += 1;
  console.warn(`REVIEW ${assets[0].view}: identical source pixels for ${locales}`);
}
if (warnings) {
  console.warn(`${warnings} cross-language duplicate groups require source review. See docs/SCREENSHOT_UPDATE_DE.md.`);
  if (process.argv.includes('--strict')) process.exitCode = 1;
} else {
  console.log('No unexpected pixel-identical assets across different languages. Human language review is still required.');
}
