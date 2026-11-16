import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function list(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await list(path));
    else if (/\.js$/.test(entry.name)) out.push(path);
  }
  return out;
}
const files = await list('dist/assets');
const bytes = (await Promise.all(files.map(async file => (await stat(file)).size))).reduce((a,b)=>a+b,0);
if (bytes > 250 * 1024) throw new Error(`Initial JS bundle is ${bytes} bytes; budget is 256000 bytes.`);
process.stdout.write(`JavaScript bundle: ${bytes} bytes (256000 byte budget)\n`);

