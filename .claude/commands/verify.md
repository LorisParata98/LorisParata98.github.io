---
description: Gate di verifica prima di consegnare una modifica (build + i18n + diff)
allowed-tools: Bash(npm run build-prod:*), Bash(npm run test:ci:*), Bash(node -e:*), Bash(git status:*), Bash(git diff:*), Read, Grep
---

Esegui il gate di verifica del progetto e riporta l'esito.

## 1. Build + prerender

```bash
npm run build-prod
```

Deve chiudere con `Prerendered 2 static routes.` e senza errori.

- `strictTemplates` intercetta qui gli errori di template (non c'è linter)
- il prerender esegue l'app in Node: un `NG0401` ("An error occurred while
  extracting routes") significa codice browser non protetto da
  `isPlatformBrowser`, oppure un provider che esplode al bootstrap
- riporta i warning di budget (initial > 2mb) e ogni scostamento marcato dagli
  ordini di grandezza in `.claude/docs/deployment.md`

## 2. Test

```bash
npm run test:ci
```

Girano anche in CI: se falliscono, il deploy si ferma.

## 3. Allineamento i18n

Solo se il diff tocca `public/assets/i18n/` o aggiunge chiavi nei template:

```bash
node -e "
const fs=require('fs');
const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?flat(v,p+k+'.'):[p+k]);
const it=flat(JSON.parse(fs.readFileSync('public/assets/i18n/it.json','utf8')));
const en=flat(JSON.parse(fs.readFileSync('public/assets/i18n/en.json','utf8')));
console.log('mancanti in en:', it.filter(k=>!en.includes(k)).length);
console.log('mancanti in it:', en.filter(k=>!it.includes(k)).length);
"
```

Il baseline noto è 78 mancanti in `en` e 4 in `it`. Segnala solo se i numeri sono
peggiorati rispetto a questo.

## 4. Controlli sul diff

```bash
git status --short
git diff
```

Verifica che non ci sia nulla di quanto segue:

- stringhe UI hardcoded nei template (devono passare da `| transloco`)
- path asset che iniziano con `/` (`/assets/...` rompe su GitHub Pages)
- `@Input()` / `@Output()` invece di `input()` / `output()`
- nuovi `console.log` o `alert()`
- colori hex inline nello SCSS invece di `var(--...)`
- accessi diretti a `window` / `document` / `localStorage` senza guardia
  `isPlatformBrowser` (rompono il prerender)
- rotte aggiunte senza `description` in `data` o senza voce in `public/sitemap.xml`
- file toccati sotto `dist/`, `.angular/`, `node_modules/`

## 5. Report

Chiudi con: esito build e prerender, esito test, delta i18n, elenco delle
violazioni trovate (o "nessuna").
Non fare commit se non è stato richiesto esplicitamente.
