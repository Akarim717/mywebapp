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

const assets = ['tioman-opening-resort-v2.jpg', 'tioman-jetty-hero.jpg', 'mersing-reunion.jpg', 'kampung-tekek.jpg', 'jetty-confrontation.jpg', 'daniel-missing.jpg'];
const assetOutput = resolve(output, 'assets', 'tioman');
mkdirSync(assetOutput, { recursive: true });
for (const asset of assets) {
  const source = resolve(root, 'assets', 'tioman', asset);
  if (!existsSync(source)) throw new Error(`Aset visual tiada: ${asset}`);
  cpSync(source, resolve(assetOutput, asset));
}

const fontSource = resolve(root, 'assets', 'fonts');
if (!existsSync(resolve(fontSource, 'ScoutieSans-Variable.ttf'))) throw new Error('Fon Scoutie Sans tiada.');
cpSync(fontSource, resolve(output, 'assets', 'fonts'), { recursive: true });

console.log('Binaan Yang Kita Tinggalkan di Tioman tersedia dalam dist/.');
