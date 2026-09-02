#!/usr/bin/env node
/**
 * import-material.mjs — inventaria una cartella di materiale di progetto e ne
 * importa le immagini in public/assets/images/projects/<slug>/.
 *
 *   # 1. inventario: cosa c'è, in che ordine, cosa scartare
 *   node .claude/skills/material-import/scripts/import-material.mjs <path-materiale>
 *
 *   # 2. import nell'ordine deciso
 *   node .claude/skills/material-import/scripts/import-material.mjs <path-materiale> \
 *        --slug cv-builder --import "hero.png,dashboard.png,mobile.jpg"
 *
 *   # tutte le immagini in ordine naturale
 *   ... --slug cv-builder --import all
 *
 * Le immagini statiche vengono ricodificate in webp usando la canvas di Chrome
 * headless: nessuna dipendenza npm, nessun ImageMagick. Le GIF animate vengono
 * copiate così come sono, perché ricodificarle le ridurrebbe al primo frame.
 *
 * Va lanciato dalla root del portfolio. Non modifica mai la cartella sorgente.
 */

import { spawn, execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/* =========================================================== argomenti === */

const argv = process.argv.slice(2);
const flags = new Map();
const positional = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) flags.set(key, true);
    else flags.set(key, argv[++i]);
  } else positional.push(a);
}
const opt = (k, def) => (flags.has(k) ? flags.get(k) : def);
const num = (k, def) => {
  const n = Number(flags.get(k));
  return flags.has(k) && !Number.isNaN(n) ? n : def;
};

if (flags.has('help') || !positional.length) {
  console.log(`
import-material.mjs — dalla cartella di materiale alla cartella immagini del progetto

  node import-material.mjs <path-materiale>                    inventario
  node import-material.mjs <path-materiale> --slug <s> --import "a.png,b.png"

Opzioni
  --slug <s>       cartella di destinazione sotto public/assets/images/projects/
  --out <dir>      destinazione esplicita (ignora --slug)
  --import <list>  nomi file separati da virgola, NELL'ORDINE voluto, oppure "all"
  --width <px>     larghezza massima in uscita (default 1600)
  --quality <n>    qualità webp 0-100 (default 82)
  --start <n>      indice del primo file (default: primo libero)
  --force          sovrascrivi file esistenti
  --dry            mostra cosa farebbe senza scrivere
  --depth <n>      profondità di scansione della cartella (default 4)
`);
  process.exit(0);
}

const SRC = path.resolve(positional[0]);
if (!fs.existsSync(SRC) || !fs.statSync(SRC).isDirectory()) {
  console.error(`Non è una cartella: ${SRC}`);
  process.exit(1);
}

const WIDTH = num('width', 1600);
const QUALITY = num('quality', 82);
const DRY = flags.has('dry');
const FORCE = flags.has('force');
const DEPTH = num('depth', 4);

const slug =
  opt('slug', null) ||
  path
    .basename(SRC)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const outDir = path.resolve(
  opt('out', path.join('public/assets/images/projects', slug)),
);

/* ============================================================ scansione == */

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.bmp']);
const DOC_EXT = new Set(['.md', '.txt', '.json', '.pdf', '.docx', '.rtf', '.doc', '.odt', '.csv']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.avi', '.mkv', '.m4v']);
const DESIGN_EXT = new Set(['.fig', '.sketch', '.xd', '.psd', '.ai', '.afdesign']);
const JUNK = new Set(['thumbs.db', 'desktop.ini', '.ds_store']);
const IGNORED_DIRS = new Set(['node_modules', '.git', '__macosx', '.svn']);

const entries = [];
function walk(dir, depth) {
  if (depth > DEPTH) return;
  let list;
  try {
    list = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of list) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (IGNORED_DIRS.has(e.name.toLowerCase())) continue;
      walk(full, depth + 1);
    } else if (e.isFile()) {
      if (JUNK.has(e.name.toLowerCase())) continue;
      entries.push({
        name: e.name,
        rel: path.relative(SRC, full).split(path.sep).join('/'),
        abs: full,
        ext: path.extname(e.name).toLowerCase(),
        size: fs.statSync(full).size,
      });
    }
  }
}
walk(SRC, 0);

/* ====================================================== header immagini == */

function pngSize(b) {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

function jpegSize(b) {
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i < b.length - 9) {
    if (b[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = b[i + 1];
    // SOF0-SOF15, esclusi DHT (C4), JPG (C8) e DAC (CC): non sono frame header
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

function gifSize(b) {
  return b.slice(0, 3).toString('latin1') === 'GIF' ? [b.readUInt16LE(6), b.readUInt16LE(8)] : null;
}

function webpSize(b) {
  if (b.slice(0, 4).toString('latin1') !== 'RIFF') return null;
  const fourcc = b.slice(12, 16).toString('latin1');
  if (fourcc === 'VP8X') {
    return [
      1 + (b[24] | (b[25] << 8) | (b[26] << 16)),
      1 + (b[27] | (b[28] << 8) | (b[29] << 16)),
    ];
  }
  if (fourcc === 'VP8 ') {
    const s = b.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    if (s < 0) return null;
    return [b.readUInt16LE(s + 3) & 0x3fff, b.readUInt16LE(s + 5) & 0x3fff];
  }
  if (fourcc === 'VP8L') {
    const n = b.readUInt32LE(21);
    return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1];
  }
  return null;
}

function dimensions(buf, ext) {
  try {
    if (ext === '.png') return pngSize(buf);
    if (ext === '.jpg' || ext === '.jpeg') return jpegSize(buf);
    if (ext === '.gif') return gifSize(buf);
    if (ext === '.webp') return webpSize(buf);
  } catch {
    return null;
  }
  return null;
}

/** Una GIF con più di un Graphic Control Extension è animata. */
function isAnimatedGif(buf) {
  const gce = Buffer.from([0x00, 0x21, 0xf9, 0x04]);
  let count = 0;
  let i = 0;
  while ((i = buf.indexOf(gce, i)) !== -1) {
    if (++count > 1) return true;
    i += 4;
  }
  return false;
}

/* ============================================== classificazione immagini = */

const naturalSort = (a, b) =>
  a.rel.localeCompare(b.rel, 'it', { numeric: true, sensitivity: 'base' });

const images = [];
const docs = [];
const videos = [];
const designFiles = [];
const others = [];

for (const e of entries) {
  if (IMAGE_EXT.has(e.ext)) images.push(e);
  else if (DOC_EXT.has(e.ext)) docs.push(e);
  else if (VIDEO_EXT.has(e.ext)) videos.push(e);
  else if (DESIGN_EXT.has(e.ext)) designFiles.push(e);
  else others.push(e);
}
images.sort(naturalSort);
docs.sort(naturalSort);

const byHash = new Map();
for (const img of images) {
  const buf = fs.readFileSync(img.abs);
  img.dim = dimensions(buf, img.ext);
  img.animated = img.ext === '.gif' && isAnimatedGif(buf);
  img.hash = crypto.createHash('sha1').update(buf).digest('hex');
  if (!byHash.has(img.hash)) byHash.set(img.hash, []);
  byHash.get(img.hash).push(img);
}
for (const group of byHash.values()) {
  if (group.length > 1) group.slice(1).forEach((img) => (img.duplicateOf = group[0].rel));
}

const kb = (n) => (n < 1024 ? `${n} B` : `${(n / 1024).toFixed(0)} kB`);
const mb = (n) => (n < 1024 * 1024 ? kb(n) : `${(n / 1024 / 1024).toFixed(1)} MB`);

/** Larghezza sotto la quale un'immagine non regge il carousel del drawer. */
const MIN_WIDTH = 800;
const isUsable = (img) => !img.duplicateOf && (!img.dim || img.dim[0] >= MIN_WIDTH);

/* ============================================================ inventario = */

function inventory() {
  const out = [];
  const say = (s = '') => out.push(s);

  say(`# Materiale: ${path.basename(SRC)}`);
  say();
  say(`Sorgente: \`${SRC}\``);
  say(`Slug proposto: \`${slug}\``);
  say(`Destinazione: \`${path.relative(process.cwd(), outDir).split(path.sep).join('/')}\``);

  if (fs.existsSync(outDir)) {
    const existing = fs.readdirSync(outDir).filter((f) => /\.(webp|gif)$/i.test(f));
    say(
      existing.length
        ? `La cartella esiste già e contiene ${existing.length} file: ${existing.join(', ')}. L'import continua dal primo indice libero.`
        : 'La cartella esiste ed è vuota.',
    );
  } else {
    say('La cartella non esiste ancora, verrà creata.');
  }
  say();

  say(`## Immagini (${images.length})`);
  say();
  if (!images.length) {
    say('_nessuna_');
  } else {
    say('| # | file | dimensioni | peso | note |');
    say('| --- | --- | --- | --- | --- |');
    images.forEach((img, i) => {
      const notes = [];
      if (img.duplicateOf) notes.push(`duplicato di \`${img.duplicateOf}\``);
      if (img.animated) notes.push('GIF animata: copiata così com\'è');
      if (img.dim && img.dim[0] < MIN_WIDTH) notes.push(`stretta: sotto i ${MIN_WIDTH} px si vede male nel carousel`);
      if (img.dim && img.dim[0] > 3000) notes.push('molto larga: verrà ridotta');
      if (img.size > 3 * 1024 * 1024) notes.push('pesante');
      if (!img.dim) notes.push('header non riconosciuto');
      say(
        `| ${i + 1} | \`${img.rel}\` | ${img.dim ? img.dim.join('x') : '?'} | ${kb(img.size)} | ${notes.join('; ') || '' } |`,
      );
    });
    const dupes = images.filter((i) => i.duplicateOf).length;
    if (dupes) {
      say();
      say(
        dupes === 1
          ? '1 duplicato esatto, già escluso dal comando qui sotto.'
          : `${dupes} duplicati esatti, già esclusi dal comando qui sotto.`,
      );
    }
  }
  say();

  say(`## Documenti (${docs.length})`);
  say();
  if (!docs.length) {
    say('_nessuno: i contenuti della scheda vanno chiesti all\'utente_');
  } else {
    for (const d of docs) {
      const readable = ['.md', '.txt', '.json', '.csv', '.pdf'].includes(d.ext);
      say(`- \`${d.rel}\` — ${kb(d.size)}${readable ? '' : ' — formato non leggibile direttamente, chiedi un export in PDF o testo'}`);
    }
    say();
    say('Leggili prima di scrivere la voce: da qui escono `descrizione`, `problem` e gli step del case study.');
  }
  say();

  if (videos.length) {
    say(`## Video (${videos.length})`);
    say();
    for (const v of videos) say(`- \`${v.rel}\` — ${mb(v.size)}`);
    say();
    say('Per farne una GIF serve ffmpeg (`winget install Gyan.FFmpeg`):');
    say();
    say('```');
    say(`ffmpeg -i "${videos[0].abs.split(path.sep).join('/')}" -vf "fps=12,scale=800:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=3" -loop 0 "${path.join(outDir, 'demo.gif').split(path.sep).join('/')}"`);
    say('```');
    say();
    say('Tetto per le GIF del portfolio: 1.5 MB. Se sfonda, taglia con `-t 8` o abbassa `fps`.');
    say();
  }

  if (designFiles.length) {
    say(`## Sorgenti di design (${designFiles.length})`);
    say();
    for (const f of designFiles) say(`- \`${f.rel}\` — ${mb(f.size)}`);
    say();
    say('Non importabili: servono export PNG o JPG dalle board.');
    say();
  }

  if (others.length) {
    say(`## Altro (${others.length})`);
    say();
    for (const f of others.slice(0, 15)) say(`- \`${f.rel}\` — ${kb(f.size)}`);
    if (others.length > 15) say(`- _...e altri ${others.length - 15}_`);
    say();
  }

  const usable = images.filter(isUsable);
  say('## Prossimo passo');
  say();
  say('Scegli quali immagini e in che ordine. La prima è la copertina della card.');
  if (!usable.length) {
    say();
    say('_Nessuna immagine utilizzabile: tutte duplicate o troppo strette._');
    console.log(out.join('\n'));
    return;
  }
  say();
  say('```bash');
  say(
    `node .claude/skills/material-import/scripts/import-material.mjs "${SRC.split(path.sep).join('/')}" \\`,
  );
  say(`     --slug ${slug} --import "${usable.slice(0, 4).map((i) => i.rel).join(',')}"`);
  say('```');

  console.log(out.join('\n'));
}

/* ================================================== encoder webp (Chrome) */

function findChrome() {
  if (process.env['CHROME_PATH'] && fs.existsSync(process.env['CHROME_PATH'])) {
    return process.env['CHROME_PATH'];
  }
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    `${os.homedir()}/AppData/Local/Google/Chrome/Application/chrome.exe`,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  for (const c of ['google-chrome', 'chromium', 'chrome']) {
    try {
      const p = execFileSync(process.platform === 'win32' ? 'where' : 'which', [c], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      })
        .split(/\r?\n/)[0]
        .trim();
      if (p && fs.existsSync(p)) return p;
    } catch {
      /* continua */
    }
  }
  return null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class Encoder {
  static async start() {
    const bin = findChrome();
    if (!bin) throw new Error('Chrome non trovato. Imposta CHROME_PATH.');
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'material-import-'));
    const child = spawn(
      bin,
      [
        '--headless=new',
        '--disable-gpu',
        '--mute-audio',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        '--force-color-profile=srgb',
        `--user-data-dir=${profile}`,
        '--remote-debugging-port=0',
        'about:blank',
      ],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    );

    const wsUrl = await new Promise((resolve, reject) => {
      let buf = '';
      const timer = setTimeout(() => reject(new Error('Chrome non ha esposto la porta di debug')), 30000);
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => {
        buf += chunk;
        const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
        if (m) {
          clearTimeout(timer);
          resolve(m[1]);
        }
      });
      child.on('exit', (code) => {
        clearTimeout(timer);
        reject(new Error(`Chrome è uscito con codice ${code}`));
      });
    });

    const socket = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', () => reject(new Error('WebSocket CDP fallita')), { once: true });
    });

    const encoder = new Encoder(socket, child, profile);
    await encoder._openPage();
    return encoder;
  }

  constructor(socket, child, profile) {
    this._socket = socket;
    this._child = child;
    this._profile = profile;
    this._id = 0;
    this._pending = new Map();
    socket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === undefined) return;
      const entry = this._pending.get(msg.id);
      if (!entry) return;
      this._pending.delete(msg.id);
      if (msg.error) entry.reject(new Error(msg.error.message));
      else entry.resolve(msg.result);
    });
  }

  _send(method, params = {}, sessionId) {
    const id = ++this._id;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this._socket.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => this._pending.set(id, { resolve, reject }));
  }

  async _openPage() {
    const { targetId } = await this._send('Target.createTarget', {
      // Serve un documento reale: about:blank non ha una canvas utilizzabile.
      url: 'data:text/html,<title>encoder</title>',
    });
    const { sessionId } = await this._send('Target.attachToTarget', { targetId, flatten: true });
    this._session = sessionId;
    await this._send('Runtime.enable', {}, sessionId);
    await sleep(200);
  }

  /**
   * Il file viene passato come data URL: una pagina non può caricare file://
   * e un'immagine file:// sporcherebbe la canvas, rendendo toDataURL inutile.
   */
  async toWebp(abs, maxWidth, quality) {
    const MIME = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.avif': 'image/avif',
      '.bmp': 'image/bmp',
    };
    const mime = MIME[path.extname(abs).toLowerCase()];
    if (!mime) throw new Error(`formato non supportato: ${path.extname(abs)}`);
    const source = `data:${mime};base64,${fs.readFileSync(abs).toString('base64')}`;

    const res = await this._send(
      'Runtime.evaluate',
      {
        awaitPromise: true,
        returnByValue: true,
        expression: `(async () => {
          const img = new Image();
          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = () => rej(new Error('immagine non decodificabile'));
            img.src = ${JSON.stringify(source)};
          });
          const target = Math.min(${maxWidth}, img.naturalWidth);
          const scale = target / img.naturalWidth;
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.naturalWidth * scale);
          canvas.height = Math.round(img.naturalHeight * scale);
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/webp', ${quality / 100});
        })()`,
      },
      this._session,
    );
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description ?? 'errore in pagina');
    }
    const dataUrl = res.result?.value;
    if (!dataUrl?.startsWith('data:image/webp')) throw new Error('Chrome non ha prodotto un webp');
    return Buffer.from(dataUrl.split(',')[1], 'base64');
  }

  async stop() {
    try {
      this._socket.close();
    } catch {
      /* già chiusa */
    }
    if (this._child.exitCode === null && !this._child.killed) {
      const exited = new Promise((resolve) => this._child.once('exit', resolve));
      this._child.kill();
      await Promise.race([exited, sleep(5000)]);
    }
    await sleep(150);
    try {
      fs.rmSync(this._profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch {
      /* lock residuo di Chrome: resta in %TEMP%, innocuo */
    }
  }
}

/* ================================================================ import = */

function nextIndex() {
  if (flags.has('start')) return num('start', 1);
  let max = 0;
  if (fs.existsSync(outDir)) {
    for (const f of fs.readdirSync(outDir)) {
      const m = f.match(/^(\d+)\.(webp|gif|png|jpe?g)$/i);
      if (m) max = Math.max(max, Number(m[1]));
    }
  }
  return max + 1;
}

function resolveSelection(spec) {
  // "all" salta duplicati e immagini troppo strette. Per forzarne una,
  // nominala esplicitamente nella lista.
  if (spec === true || String(spec).toLowerCase() === 'all') return images.filter(isUsable);
  const wanted = String(spec)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const picked = [];
  for (const w of wanted) {
    const key = w.toLowerCase();
    const found =
      images.find((i) => i.rel.toLowerCase() === key) ??
      images.find((i) => i.name.toLowerCase() === key);
    if (!found) {
      console.error(`  ! non trovato nel materiale: ${w}`);
      continue;
    }
    picked.push(found);
  }
  return picked;
}

async function runImport() {
  const selection = resolveSelection(flags.get('import'));
  if (!selection.length) {
    console.error('Nessuna immagine selezionata. Lancia senza --import per vedere l\'inventario.');
    process.exit(1);
  }

  console.log(`Sorgente: ${SRC}`);
  console.log(`Destinazione: ${outDir}`);
  console.log(`${selection.length} immagini, larghezza max ${WIDTH}px, qualità ${QUALITY}`);
  console.log();

  if (!DRY) fs.mkdirSync(outDir, { recursive: true });
  let index = nextIndex();
  let encoder = null;
  const written = [];
  const failed = [];

  try {
    for (const img of selection) {
      // Le GIF animate si copiano: ricodificarle in webp le ridurrebbe al
      // primo frame, che è esattamente quello che non si vuole da una demo.
      const keepAsGif = img.animated;
      const name = `${index}.${keepAsGif ? 'gif' : 'webp'}`;
      const dest = path.join(outDir, name);

      if (fs.existsSync(dest) && !FORCE) {
        console.error(`  ! ${name} esiste già, salto (usa --force)`);
        index++;
        continue;
      }

      if (DRY) {
        console.log(`  [dry] ${img.rel} -> ${name}${keepAsGif ? ' (copia)' : ''}`);
        written.push(name);
        index++;
        continue;
      }

      // Un file corrotto o troncato non deve far fallire l'intero import:
      // nelle cartelle di materiale ce n'è quasi sempre almeno uno.
      try {
        if (keepAsGif) {
          fs.copyFileSync(img.abs, dest);
          const size = fs.statSync(dest).size;
          console.log(`  ${name}  ${mb(size)}  <- ${img.rel} (copiata, animata)`);
          if (size > 1.5 * 1024 * 1024) {
            console.log('     ! oltre 1.5 MB: ricomprimila con ffmpeg prima di pubblicarla');
          }
        } else {
          encoder ??= await Encoder.start();
          const buf = await encoder.toWebp(img.abs, WIDTH, QUALITY);
          fs.writeFileSync(dest, buf);
          const note = buf.length > 250 * 1024 ? '  <-- pesante, riprova con --width 1440' : '';
          console.log(`  ${name}  ${kb(buf.length)}  <- ${img.rel} (${kb(img.size)})${note}`);
        }
      } catch (err) {
        // L'indice non avanza: la numerazione resta contigua.
        // Chrome allega lo stack JS al messaggio: tieni solo la prima riga.
        const reason = String(err.message).split('\n')[0].replace(/^Error:\s*/, '');
        failed.push({ rel: img.rel, reason });
        console.error(`  ! ${img.rel}: ${reason}`);
        continue;
      }
      written.push(name);
      index++;
    }
  } finally {
    await encoder?.stop();
  }

  if (failed.length) {
    console.log();
    const label = failed.length === 1 ? '1 file non importato' : `${failed.length} file non importati`;
    console.log(`${label}: ${failed.map((f) => f.rel).join(', ')}`);
    console.log('Chiedi all\'utente un export nuovo, oppure escludilo dalla lista.');
  }

  if (!written.length) return;

  console.log();
  console.log('Da incollare nella voce del progetto:');
  console.log();
  console.log('  images: [');
  for (const n of written) console.log(`    'assets/images/projects/${slug}/${n}',`);
  console.log('  ],');
}

/* ================================================================= main == */

try {
  if (flags.has('import')) await runImport();
  else inventory();
} catch (err) {
  console.error(`\nErrore: ${err.message}`);
  process.exit(1);
}
