import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getScreenshot } from '../lib/screenshots.mjs';
import { screenshotLocales, screenshotViews } from '../lib/screenshot-assets.mjs';

const root = new URL('../', import.meta.url);
const bytes = path => readFileSync(new URL(path, root));
const read = path => bytes(path).toString('utf8');
const sha = path => createHash('sha256').update(bytes(path)).digest('hex');
const manifest = JSON.parse(read('scripts/screenshot-manifest.json'));
const crops = JSON.parse(read('scripts/screenshot-crops.json'));
const expectedViews = ['calendar', 'appointments', 'reports', 'pdf', 'cloud'];

function losslessWebpSize(buffer) {
  assert.equal(buffer.toString('ascii', 0, 4), 'RIFF');
  assert.equal(buffer.toString('ascii', 8, 12), 'WEBP');
  assert.equal(buffer.readUInt32LE(4) + 8, buffer.length, 'Truncated WebP');
  let size;
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const type = buffer.toString('ascii', offset, offset + 4);
    const length = buffer.readUInt32LE(offset + 4);
    assert.ok(offset + 8 + length <= buffer.length, 'Invalid WebP chunk');
    assert.notEqual(type, 'VP8 ', 'Lossy WebP is not allowed');
    assert.notEqual(type, 'ANIM', 'Screenshots must be static');
    if (type === 'VP8L') {
      assert.equal(buffer[offset + 8], 0x2f, 'Invalid lossless signature');
      const bits = buffer.readUInt32LE(offset + 9);
      size = [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
    }
    offset += 8 + length + (length % 2);
  }
  assert.ok(size, 'Missing lossless image payload');
  return size;
}

test('all 37 website locales have five individual high-resolution assets', () => {
  const websiteLocales = [...read('lib/i18n/locales.js').matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1]);
  assert.deepEqual(screenshotLocales, websiteLocales);
  assert.deepEqual(Object.keys(crops.locales), websiteLocales);
  assert.deepEqual(Object.keys(screenshotViews), expectedViews);
  assert.equal(Object.keys(manifest.assets).length, 37 * 5);
  assert.deepEqual(readdirSync(new URL('public/images/screenshots/', root)).sort(), [...websiteLocales].sort());
  for (const locale of screenshotLocales) {
    const files = readdirSync(new URL(`public/images/screenshots/${locale}/`, root));
    assert.deepEqual(files.sort(), expectedViews.map(view => `${view}.webp`).sort());
    for (const view of expectedViews) {
      const image = getScreenshot(locale, view);
      const path = `public${image.src}`;
      const record = manifest.assets[path];
      assert.ok(record, path);
      assert.deepEqual(losslessWebpSize(bytes(path)), [image.width, image.height], path);
      assert.equal(sha(path), record.sha256, path);
      assert.deepEqual(record.crop, crops.views[view].crop, path);
      assert.deepEqual(record.size, [image.width, image.height], path);
      assert.equal(record.bytes, bytes(path).length, path);
      assert.equal(record.locale, locale);
      assert.equal(record.view, view);
      assert.ok(record.source.startsWith(`${crops.locales[locale]}/`), path);
      const source = crops.sourceOverrides?.[locale]?.[view] ?? crops.views[view].source;
      assert.ok(record.source.endsWith(`/${source}`), path);
    }
  }
});

test('Bengali overview uses the correctly localized chart from source 05, not the entries list', () => {
  assert.equal(crops.sourceOverrides.bn.reports, '05.png');
  const report = manifest.assets['public/images/screenshots/bn/reports.webp'];
  assert.equal(report.source, 'Bangla (bn-BD)/Android Phones 169/05.png');
  assert.equal(report.pixelSha256, '2485f87b581d79e7872fb5808fe310fe132082b35b8255d0b6ad4853a50f93fa');
});

test('native crops support high-DPI layouts and preserve main aspect ratios', () => {
  for (const [view, image] of Object.entries(screenshotViews)) {
    const phone = ['calendar', 'appointments', 'reports'].includes(view);
    // Main: max phone interior 241px; max PRO-card image 604px at 650px viewport.
    const maxDisplayWidth = phone ? 241 : 604;
    assert.ok(image.width >= maxDisplayWidth * 3, `${view} must cover DPR 3 without upscaling`);
    assert.ok(image.width >= (phone ? 1100 : 2000), view);
    const ratioError = Math.abs((image.width / image.height) / (image.layoutWidth / image.layoutHeight) - 1);
    assert.ok(ratioError < 0.0005, `${view}: main aspect-ratio drift`);
    const [left, top, right, bottom] = crops.views[view].crop;
    assert.deepEqual([right - left, bottom - top], [image.width, image.height]);
    assert.ok(left >= 0 && top >= 0 && right <= 2160 && bottom <= 3840);
  }
  for (const view of ['calendar', 'appointments', 'reports']) {
    const [left, top, right, bottom] = crops.views[view].crop;
    assert.ok(left >= 518 && right <= 1662 && top >= 713 && bottom <= 3191,
      `${view} must exclude the original physical device rim and store marketing copy`);
  }
  for (const view of ['pdf', 'cloud']) {
    const [, top, , bottom] = crops.views[view].crop;
    assert.ok(top >= 742 && bottom <= 3287, `${view} must exclude store headings and footers`);
  }
});

test('locale resolution is explicit and never depends on an atlas row', () => {
  for (const locale of ['de', 'ja', 'ko', 'th', 'bn', 'pt-br', 'nb', 'zh-cn', 'zh-tw']) {
    assert.equal(getScreenshot({ slug: locale, screenshot: locale }, 'calendar').src,
      `/images/screenshots/${locale}/calendar.webp`);
  }
  assert.equal(getScreenshot().src, '/images/screenshots/en/calendar.webp');
  assert.equal(getScreenshot(null, 'reports').src, '/images/screenshots/en/reports.webp');
  assert.equal(getScreenshot('unknown', 'pdf').src, '/images/screenshots/en/pdf.webp');
  assert.equal(getScreenshot('../../welcome', '__proto__').src, '/images/screenshots/en/calendar.webp');
  assert.equal(getScreenshot({ slug: 'de' }, 'invalid').src, '/images/screenshots/de/calendar.webp');
});

test('old atlases are removed and image delivery does not recompress native WebP files', () => {
  for (const name of ['screenshots-phone.avif', 'screenshots-pdf.avif', 'screenshots-cloud.avif']) {
    assert.equal(existsSync(new URL(`public/images/${name}`, root)), false);
  }
  const component = read('components/LocalizedVisual.js');
  assert.match(component, /import Image from 'next\/image'/);
  assert.match(component, /unoptimized/);
  assert.match(component, /priority=\{priority\}/);
  assert.match(component, /getScreenshot\('en', view\)/);
  assert.match(component, /failedSrc === requested\.src/);
  assert.doesNotMatch(component, /background-image|findIndex|screenshots-phone|\.avif/);
  const css = read('styles/Site.module.css');
  assert.doesNotMatch(css, /screenshot-atlas|background-size:300%|3700%|localizedPhone|localizedPdf|localizedCloud/);
});

test('main phone frame, shadows, rotations and responsive composition are restored', () => {
  const baseline = JSON.parse(read('tests/fixtures/main-visual-rules.json'));
  for (const [source, rules] of [['styles/Site.module.css', baseline.site], ['styles/Home.module.css', baseline.home]]) {
    const css = read(source).replace(/\s/g, '');
    for (const rule of rules) assert.ok(css.includes(rule.replace(/\s/g, '')), `${source}: ${rule}`);
  }
  assert.doesNotMatch(read('styles/Home.module.css'), /drop-shadow/);
  const page = read('components/MarketingPage.js');
  assert.equal([...page.matchAll(/<Phone\s/g)].length, 5);
  assert.equal([...page.matchAll(/<Phone[^>]*\bpriority\s*\/>/g)].length, 2);
  assert.equal([...page.matchAll(/<LocalizedVisual\s/g)].length, 2);
  assert.match(page, /className=\{styles\.insightVisual\}>\s*<Phone/);
  assert.doesNotMatch(page, /<LocalizedVisual[^>]*\bphone\b/);
  assert.equal([...page.matchAll(/<StoreButtons locale=\{locale\}\s*\/>/g)].length, 2);
});

test('all four protected files retain their original byte hashes, including next.config.mjs', () => {
  const baseline = JSON.parse(read('tests/fixtures/auth-baseline.json'));
  assert.deepEqual(Object.keys(baseline), [
    'pages/welcome.js', 'pages/reset-password.js', 'messages/reset-password-messages.js', 'next.config.mjs',
  ]);
  for (const [path, expected] of Object.entries(baseline)) assert.equal(sha(path), expected, path);
});
