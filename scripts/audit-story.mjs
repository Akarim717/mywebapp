import { readFileSync, existsSync } from 'node:fs';

const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  "The CEO's Ultimatum",
  'The Workforce Evidence',
  'The Capability Trap',
  'The Leak',
  'The Fairness Problem',
  'The Client Threat',
  'The CEO Pushback',
  'The Boardroom',
  'Strategic Renewal',
  "The Numbers Work, the Organisation Doesn't",
  'The Trust Deficit',
  'Capability Collapse',
  'Transformation Without Traction',
  'The Procedural Crisis',
  'The Adaptive Turnaround',
  'The Principled Defeat',
  'Academic debrief',
  'The Road Not Taken',
  'Learning Journey Report',
];

const missing = required.filter(text => !app.includes(text) && !html.includes(text));
for (let i = 1; i <= 8; i += 1) {
  const filename = `assets/restructuring-scene-${String(i).padStart(2, '0')}.jpg`;
  if (!existsSync(new URL(`../${filename}`, import.meta.url))) missing.push(filename);
}
if ((app.match(/id:'[ABCD]'/g) || []).length < 28) missing.push('28+ branching choices');
if (missing.length) {
  console.error(`Simulation audit failed: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Simulation audit passed: scenes, dialogue, decisions, endings and learning layers are present.');
