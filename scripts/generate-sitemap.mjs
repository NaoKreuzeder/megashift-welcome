import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const localeSource = readFileSync(join(root, 'lib/i18n/locales.js'), 'utf8');
const slugs = [...localeSource.matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1]);

if (!slugs.includes('en') || slugs.length < 2) {
  throw new Error('Could not read website locales from lib/i18n/locales.js');
}

const base = 'https://www.megashiftapp.com';
const urls = [
  `${base}/`,
  `${base}/support`,
  `${base}/privacy`,
  `${base}/terms`,
];

for (const slug of slugs.filter(slug => slug !== 'en')) {
  urls.push(`${base}/${slug}`);
  urls.push(`${base}/${slug}/support`);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(url => `  <url><loc>${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

writeFileSync(join(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap with ${urls.length} URLs.`);
