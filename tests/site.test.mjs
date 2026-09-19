import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const sha = path => createHash('sha256').update(readFileSync(new URL(`../${path}`, import.meta.url))).digest('hex');

test('authoritative site settings are current', () => {
  const site = read('lib/site.js');
  assert.match(site, /megashift\.app@gmail\.com/);
  assert.match(site, /megashiftapp\.com/);
  assert.match(site, /id6462981048/);
  assert.match(site, /com\.pattarachanokae\.shiftmob/);
  assert.doesNotMatch(site, /shiftmobapp\.com/);
});

test('final legal pages contain the approved provider and are public', () => {
  const privacy = read('pages/privacy.js');
  const terms = read('pages/terms.js');
  for (const text of [privacy, terms]) {
    assert.match(text, /Pattarachanok Klinjan/);
    assert.match(text, /1020 Green House Moo 7/);
    assert.match(text, /megashift\.app@gmail\.com|site\.supportEmail/);
  }
  assert.match(privacy, /draft=\{false\}/);
  assert.match(terms, /draft=\{!release\.termsApproved\}/);
  const release = JSON.parse(read('content/release.json'));
  assert.equal(release.privacyApproved, true);
  assert.equal(release.termsApproved, true);
  assert.equal(release.providerDetailsApproved, true);
  assert.equal(release.securityUpdateReviewed, true);
});

test('Google sign-in is clearly separated from device calendar access', () => {
  const privacy = read('pages/privacy.js');
  assert.match(privacy, /does not use the Google Calendar API/i);
  assert.match(privacy, /Google Calendar OAuth scopes/i);
  assert.match(privacy, /Google API Services User Data Policy/);
});

test('marketing site keeps supplied imagery and uses official store badges', () => {
  for (const asset of ['megashift-icon.svg','calendar.svg','appointments.svg','reports.svg','hours.svg','pdf.svg','cloud.svg','themes.svg']) {
    assert.ok(existsSync(new URL(`../public/images/${asset}`, import.meta.url)), asset);
  }
  const badges = read('components/StoreButtons.js');
  assert.match(badges, /tools\.applemediaservices\.com/);
  assert.match(badges, /play\.google\.com\/intl\/en_us\/badges/);
  assert.doesNotMatch(badges, //);
});

test('localized website routes and content are complete', () => {
  const localeSource = read('lib/i18n/locales.js');
  const slugs = [...localeSource.matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1]);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(slugs.length, 37);
  assert.equal(slugs[0], 'en');

  for (const slug of slugs) {
    const path = `content/locales/${slug}.js`;
    assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), path);
    const content = read(path);
    assert.match(content, /export default/);
    assert.doesNotMatch(content, /export \{ default \} from '\.\/en'/);
  }

  assert.ok(existsSync(new URL('../pages/[locale]/index.js', import.meta.url)));
  assert.ok(existsSync(new URL('../pages/[locale]/support.js', import.meta.url)));
  const localizedVisual = read('components/LocalizedVisual.js');
  assert.match(localizedVisual, /getScreenshot/);
  assert.match(localizedVisual, /unoptimized/);
  for (const slug of slugs) {
    for (const view of ['calendar', 'appointments', 'reports', 'pdf', 'cloud']) {
      const asset = `public/images/screenshots/${slug}/${view}.webp`;
      assert.ok(existsSync(new URL(`../${asset}`, import.meta.url)), asset);
    }
  }
  assert.match(read('components/SiteLayout.js'), /localeBySlug\.en/);
});

test('existing auth implementation remains unchanged', () => {
  assert.equal(sha('pages/welcome.js'), '323c733d712d7c0a0988f24f4068b37008553d00d0c4a5a3adfabbd97d216f65');
  assert.equal(sha('pages/reset-password.js'), 'e996d4e8e1461f508b61e6301e7e8790bddb687c82e363d9467f1ad5c908dcfe');
  assert.equal(sha('messages/reset-password-messages.js'), '327f74c0bde5736a3b91766b6b6fd5e7f13f1630fd08e851e2668762c2c8adf5');
});

test('security, indexing and localized sitemap settings are present', () => {
  const config = read('next.config.mjs');
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /X-Robots-Tag/);

  const sitemap = read('public/sitemap.xml');
  assert.doesNotMatch(sitemap, /welcome|reset-password/);
  for (const path of ['/de', '/ja', '/bn', '/zh-tw', '/de/support', '/ja/support']) {
    assert.match(sitemap, new RegExp(path.replace('/', '\\/')));
  }
});

test('localized SEO uses canonical and hreflang without changing auth routes', () => {
  const seo = read('components/Seo.js');
  assert.match(seo, /hrefLang/);
  assert.match(seo, /x-default/);
  const config = read('next.config.mjs');
  assert.doesNotMatch(config, /redirects\s*\(/);
  assert.doesNotMatch(config, /i18n\s*:/);
});

test('maintenance-LTS Next.js security patch is pinned', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.dependencies.next, '15.5.25');
  assert.equal(pkg.devDependencies['eslint-config-next'], '15.5.25');
  const lock = JSON.parse(read('package-lock.json'));
  assert.equal(lock.packages['node_modules/next'].version, '15.5.25');
  assert.equal(lock.packages['node_modules/@next/env'].version, '15.5.25');
});
