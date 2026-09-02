---
name: material-import
description: Importa un progetto nel portfolio partendo da una cartella di materiale (screenshot, export Figma, mockup, brief, note, registrazioni). Inventaria i file, converte le immagini in webp dentro public/assets/images/projects/<slug>/ e compone la voce Project per projects.data.ts. Usa quando l'utente passa il path di una cartella di materiale, dice "importa questo progetto" o "ho il materiale qui", o chiede di caricare screenshot e documenti di un progetto nella pagina progetti.
---

# Import da cartella di materiale

Input: una cartella con dentro il materiale di un progetto. Output: le immagini
in `public/assets/images/projects/<slug>/` e la voce in
`src/app/data/projects.data.ts`.

Copre il caso "ho una cartella di roba". Se invece parti dal **repository** del
progetto o da un URL live, la skill giusta è `project-intake`.

Leggi `.claude/docs/data-model.md` prima di scrivere nel file dati.

## Fase 1 — Inventario

```bash
node .claude/skills/material-import/scripts/import-material.mjs "<path-materiale>"
```

Non scrive niente. Stampa cosa c'è, diviso per tipo:

- **immagini** con dimensioni reali, peso, duplicati esatti (hash), GIF animate,
  e quelle troppo strette per il carousel
- **documenti** — è da qui che esce il contenuto della scheda
- **video** — con il comando ffmpeg già pronto per farne una GIF
- **sorgenti di design** (`.fig`, `.psd`, `.sketch`) — non importabili, servono
  gli export
- **altro**

Slug proposto dal nome della cartella, in kebab-case. Se la cartella di
destinazione esiste già, l'inventario dice cosa contiene: l'import continua dal
primo indice libero, non sovrascrive.

Il path va tra virgolette: le cartelle di materiale hanno quasi sempre spazi nel
nome.

## Fase 2 — Leggi i documenti

I file trovati in `## Documenti` vanno **letti**, non elencati. Da lì escono
`descrizione`, `problem`, gli step e a volte metriche vere.

- `.md`, `.txt`, `.json`, `.csv` — leggili con Read
- `.pdf` — leggibile con Read, un intervallo di pagine per volta
- `.docx`, `.doc`, `.odt`, `.rtf` — **non** leggibili: chiedi all'utente un
  export in PDF o il contenuto incollato. Non tirare a indovinare dal nome file

Se non c'è nessun documento, il contenuto della scheda va chiesto: vedi
"Cosa chiedere sempre" più sotto.

## Fase 3 — Scegli le immagini

Questa è una decisione, non un passaggio automatico. Serve l'utente.

L'ordine conta: **la prima immagine è la copertina della card**. Le altre sono
il carousel del drawer, in quell'ordine.

Proponi tu un ordine sensato — panoramica prima, dettagli dopo, mobile in fondo —
e falla confermare. Escludi duplicati e immagini sotto gli 800 px: lo script le
segnala già.

## Fase 4 — Import

```bash
node .claude/skills/material-import/scripts/import-material.mjs "<path-materiale>" \
     --slug <slug> --import "hero.png,dashboard.png,mobile.jpg"
```

I nomi vanno **nell'ordine voluto**, path relativi alla cartella di materiale
(`mockup/hero.png`). `--import all` prende tutte le immagini utilizzabili in
ordine naturale, saltando duplicati e immagini troppo strette.

Cosa fa:

- ricodifica le immagini statiche in **webp** con la canvas di Chrome headless —
  nessuna dipendenza npm, nessun ImageMagick
- **copia le GIF animate così come sono**: ricodificarle le ridurrebbe al primo
  frame, che è l'opposto di quello che serve
- numera `1.webp`, `2.webp`, ... partendo dal primo indice libero
- non tocca mai la cartella sorgente
- se un file è corrotto lo salta, lo segnala e va avanti senza bucare la
  numerazione

Opzioni utili: `--width` (default 1600; scendi a 1440 se i file escono pesanti),
`--quality` (default 82), `--dry` per vedere la mappatura prima di scrivere,
`--force` per sovrascrivere, `--out` per una destinazione diversa.

Alla fine stampa il blocco `images: [...]` pronto da incollare.

### Budget

Le immagini già in repo stanno tra 18 e 153 kB. Sopra i 250 kB lo script avvisa:
riprova con `--width 1440`.

Le GIF sono il problema vero: le tre attualmente pubblicate pesano **17 MB in
totale**, e stanno nel carousel del drawer. Tetto per le nuove: **1.5 MB**. Se
una GIF del materiale sfonda, lo script lo dice — ricomprimila con ffmpeg prima
di pubblicarla:

```
ffmpeg -i in.gif -vf "fps=12,scale=800:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse" -loop 0 out.gif
```

Se nel materiale c'è un **video** invece di una GIF, l'inventario stampa il
comando già compilato. Serve ffmpeg (`winget install Gyan.FFmpeg`).

## Fase 5 — Voce del progetto

Scrivi la voce in `src/app/data/projects.data.ts`, nel blocco dell'anno giusto
(il file ha commenti `// 2026`, `// 2025`, ...). È lungo ~1800 righe: Edit
mirati, niente riscritture, niente riformattazioni del resto.

Path immagini **senza slash iniziale**, altrimenti si rompe su GitHub Pages:

```ts
images: ['assets/images/projects/<slug>/1.webp']   // corretto
images: ['/assets/images/projects/<slug>/1.webp']  // rotto
```

`variants` deve avere tutte e tre le chiavi (`all`, `design`, `dev`): il tipo non
le rende opzionali. Se il progetto vive in una sola mode, replica il contenuto.

Riusa le label dei tag già in uso — una nuova crea una voce in più nei filtri:

```bash
grep -oE "label: '[^']+', type: '[a-z]+'" src/app/data/projects.data.ts | sort | uniq -c | sort -rn
```

`drawerContent` è opzionale: mettilo solo se dal materiale esce un case study
vero. Senza, il drawer usa la versione ridotta ed è un risultato legittimo.

### Cosa chiedere sempre

Una cartella di materiale contiene quasi sempre immagini e quasi mai il perché.
Questi campi non si deducono dai file:

- `type` — `design`, `dev` o `both`: dipende dal ruolo dell'utente sul progetto
- `anno` — le date dei file dicono quando sono stati esportati, non quando il
  progetto è stato consegnato
- `urlPreview` — se non è scritto in un documento, chiedilo
- `problem` e `desc` delle variant — la domanda a cui il progetto risponde
- `drawerContent.design.user` — chi è l'utente e qual è il pain point
- `metrics` — **solo numeri reali**. Nessun numero nel materiale, nessuna
  metrica. Un dato inventato finisce su un sito pubblico che l'utente mostra ai
  recruiter

Metti le domande rimaste aperte in fondo alla risposta, in elenco numerato.

## Fase 6 — Verifica

```bash
npm run build-prod
```

Poi apri `/projects`: controlla la card e il drawer in tutte e tre le portfolio
mode (`all`, `design`, `dev`), e che il carousel mostri le immagini nell'ordine
deciso.

Nessuna chiave i18n da aggiungere: il contenuto dei progetti sta nei dati, non
nelle traduzioni.
