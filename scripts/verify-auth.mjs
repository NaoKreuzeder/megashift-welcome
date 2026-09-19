import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const baseline = JSON.parse(readFileSync(new URL('tests/fixtures/auth-baseline.json', root), 'utf8'));
for (const [path, expected] of Object.entries(baseline)) {
  const actual = createHash('sha256').update(readFileSync(new URL(path, root))).digest('hex');
  assert.equal(actual, expected, `Protected authentication/configuration file changed: ${path}`);
  console.log(`PASS ${path}  ${actual}`);
}
