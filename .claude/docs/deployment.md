# Deploy

## Pipeline

`.github/workflows/main.yaml` — su push a `main` e su `workflow_dispatch`.

```
checkout → setup-node (20, cache npm) → npm ci → npm run test:ci
        → npm run build-prod → configure-pages
        → upload-pages-artifact (path: dist/browser) → deploy-pages
```

Environment: `github-pages`. Concurrency group `pages` con
`cancel-in-progress: false` (i deploy si accodano, non si annullano).
Non esiste un ambiente di staging: **push su `main` = pubblicazione**.

La versione di Node è fissata a 20 (`actions/setup-node`, allineata a `.nvmrc` e
al campo `engines` in `package.json`). Senza quello step la build girerebbe su
qualunque default del runner, che cambia nel tempo.

I test girano prima della build: se falliscono, non si pubblica.

## Build

`npm run build-prod` è `ng build`, che usa `defaultConfiguration: "production"`.

Configurazione production (`angular.json`):

- `outputMode: "static"` con `server: "src/main.server.ts"` → **prerender** delle
  rotte, output in `dist/browser`
- `outputHashing: "all"`
- `serviceWorker: "ngsw-config.json"`
- budget: initial e `anyComponentStyle` — warning a 2mb, errore a 4mb

Output rilevante:

```
dist/browser/
├── index.html            home prerenderizzata
├── projects/index.html   pagina progetti prerenderizzata
├── index.csr.html        shell senza prerender
├── 404.html              fallback SPA
├── robots.txt, sitemap.xml
├── ngsw-worker.js, ngsw.json
└── main-*.js, chunk-*.js, styles-*.css
```

Ordini di grandezza attesi (se sforati, indagare):

| | |
| --- | --- |
| bundle iniziale | ~650 kB raw / ~160 kB trasferiti |
| chunk `projects-component` | ~300 kB (contiene `projects.data.ts`) |
| chunk `home-component` | ~200 kB |
| HTML prerenderizzato | ~100-125 kB per pagina |

## Asset copiati nella build

Da `angular.json → assets`:

- `src/firebase-messaging-sw.js`
- `src/favicon.svg`, `src/favicon-16.png`, `src/favicon-32.png`
- `node_modules/@mdi/angular-material/mdi.svg` → `./assets/mdi.svg`
- tutto il contenuto di `public/` → radice della build

Quindi `public/assets/images/x.webp` diventa `assets/images/x.webp` in produzione:
i riferimenti nel codice devono essere **relativi, senza slash iniziale**.

## Routing su GitHub Pages

Le due rotte prerenderizzate sono file veri (`index.html`,
`projects/index.html`), quindi Pages le serve direttamente: nessun giro di
redirect e nessun flash iniziale.

Per qualunque altro path resta il fallback:

1. Richiesta di `/qualcosa` → 404 → Pages serve `public/404.html`
2. `404.html` riscrive l'URL in `/?/qualcosa` e fa `location.replace`
3. lo script in `index.html` ricostruisce il path con `history.replaceState`
   prima del bootstrap Angular
4. il router Angular applica il wildcard e redirige alla home

`pathSegmentsToKeep = 0` in `404.html` è corretto per un sito su dominio radice
(`lorisparata98.github.io`). Se il sito passasse a un project page servito da
sottocartella, va portato a `1` e il `<base href>` in `index.html` aggiornato.

## Risorse esterne caricate a runtime

Solo Google Fonts (Poppins, Bebas Neue), con `preconnect`. Caricati sia da
`index.html` sia da `@import` in `styles.scss`: duplicato, innocuo.

## Checklist pre-deploy

```bash
npm run build-prod    # deve chiudere senza errori né warning di budget
npm run test:ci
```

Poi, se la modifica riguarda:

- **i18n** → `/i18n-check`, entrambe le lingue allineate
- **progetti** → apri `/projects` nelle tre mode (`all`, `design`, `dev`)
- **SEO** → verifica title e description nell'HTML prerenderizzato
  ([seo.md](./seo.md))
- **PWA / service worker** → `npm run serve:dist`, non `ng serve`
  ([pwa.md](./pwa.md))
- **routing** → verifica il deep link a una rotta inesistente dopo il deploy: il
  giro di `404.html` esiste solo su Pages
