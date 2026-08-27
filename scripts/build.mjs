import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of ['index.html', 'styles.css', 'app.js']) {
  const source = resolve(root, entry);
  if (!existsSync(source)) throw new Error(`Fail binaan tiada: ${entry}`);
  cpSync(source, resolve(output, entry));
}

const assets = [
  ...Array.from({ length: 8 }, (_, index) => `restructuring-scene-${String(index + 1).padStart(2, '0')}.jpg`),
  'opening-background.jpg',
  'og-restructuring.jpg',
];
const assetOutput = resolve(output, 'assets');
mkdirSync(assetOutput, { recursive: true });
for (const asset of assets) {
  const source = resolve(root, 'assets', asset);
  if (!existsSync(source)) throw new Error(`Aset visual tiada: ${asset}`);
  cpSync(source, resolve(assetOutput, asset));
}

const fontSource = resolve(root, 'assets', 'fonts');
if (!existsSync(resolve(fontSource, 'ScoutieSans-Variable.ttf'))) throw new Error('Fon Scoutie Sans tiada.');
cpSync(fontSource, resolve(output, 'assets', 'fonts'), { recursive: true });

console.log('The 72-Hour Restructuring build is ready in dist/.');
