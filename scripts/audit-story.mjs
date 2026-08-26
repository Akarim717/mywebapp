import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(root, 'app.js'), 'utf8');
const sceneBlock = source.match(/const SCENES = (\[[\s\S]*?\n\];)\n\nconst ENDINGS/);
if (!sceneBlock) throw new Error('Tidak dapat membaca data babak.');

const sandbox = {};
vm.runInNewContext(`const ASSETS = { opening:'opening', hero:'hero', reunion:'reunion', tekek:'tekek', jetty:'jetty', missing:'missing' }; this.scenes = ${sceneBlock[1]}`, sandbox);
const scenes = sandbox.scenes;
const ids = new Set(scenes.map((scene) => scene.id));
const errors = [];

if (scenes.length !== 16) errors.push(`Dijangka 16 nod babak termasuk tiga varian Babak 7, ditemui ${scenes.length}.`);
for (let number = 1; number <= 14; number += 1) {
  if (!scenes.some((scene) => scene.number === number)) errors.push(`Babak ${number} tiada.`);
}
for (const scene of scenes) {
  if (!scene.title || !scene.image || !scene.chunks?.length) errors.push(`${scene.id} tidak lengkap.`);
  for (const choice of scene.choices || []) {
    if (!choice.id || !choice.label || !ids.has(choice.next)) errors.push(`Pilihan tidak sah dalam ${scene.id}.`);
  }
  if (scene.next && scene.next !== 'ENDING' && !ids.has(scene.next)) errors.push(`${scene.id} menuju nod yang tiada.`);
}

const branchTargets = new Set(scenes.find((scene) => scene.id === 'P1-S06')?.choices?.map((choice) => choice.next));
for (const id of ['P1-S07A', 'P1-S07B', 'P1-S07C']) if (!branchTargets.has(id)) errors.push(`Cabang ${id} tidak boleh dicapai.`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Audit cerita lulus: 14 babak utama, 3 varian Babak 7 dan semua destinasi pilihan sah.');
