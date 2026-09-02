# LRS Design — Portfolio di Loris Parata

Portfolio personale di [Loris Parata](https://lorisparata98.github.io), designer
e sviluppatore web. SPA Angular 19, PWA installabile, bilingue (italiano/inglese),
prerenderizzata e pubblicata su GitHub Pages.

**Live:** https://lorisparata98.github.io

## Cosa contiene

- **Home** — presentazione, sintesi dell'esperienza con radar chart delle
  competenze, anteprima progetti, esperienze lavorative, competenze tecniche,
  contatti
- **Progetti** — griglia filtrabile per tag, carousel immagini e drawer con il
  case study completo di ogni progetto

Il sito ha una **portfolio mode** globale — `Entrambi`, `Design`, `Dev` — che
cambia i contenuti mostrati, i tag evidenziati e l'accent color dell'interfaccia:
lo stesso progetto viene raccontato dal punto di vista del design o
dell'implementazione.

## Stack

| Ambito | Tecnologia |
| --- | --- |
| Framework | Angular 19 (standalone components, signals) |
| UI | PrimeNG 19 (tema Aura), Angular Material (icone MDI), Tailwind CSS 3 |
| i18n | Transloco (it / en) |
| Grafici | Chart.js |
| PWA | `@angular/service-worker` (ngsw) |
| Deploy | GitHub Actions → GitHub Pages, con prerender statico delle rotte |

## Sviluppo

Richiede Node 20 o superiore (vedi `.nvmrc`).

```bash
npm ci
npm start            # dev server su http://localhost:4201
```

Altri comandi:

```bash
npm run build-prod   # build di produzione + prerender in dist/browser
npm run test:ci      # test unitari headless
npm run serve:lan    # dev server raggiungibile in LAN (test da mobile)
npm run serve:dist   # serve la build statica, per provare la PWA
```

Il service worker non viene generato da `ng serve`: per testare PWA,
installazione e aggiornamenti serve `npm run build-prod` seguito da
`npm run serve:dist`.

## Struttura

```
src/app/
├── app.config.ts        provider globali (router, transloco, primeng, sw)
├── app.routes.ts        rotte lazy + metadati SEO
├── components/          componenti UI, uno per cartella
├── data/                contenuto dei progetti
├── models/              tipi del dominio
└── services/            stato globale e integrazioni
public/assets/i18n/      traduzioni it / en
public/assets/images/    immagini dei progetti
public/assets/theme/     override SCSS dei componenti PrimeNG
```

## Deploy

Ogni push su `main` fa partire la build e pubblica su GitHub Pages
(`.github/workflows/main.yaml`). Le due rotte vengono prerenderizzate in HTML
statico; `public/404.html` gestisce i deep link lato Pages.

## Documentazione

La documentazione tecnica di dettaglio — architettura, convenzioni, modello dati,
i18n, PWA, deploy — sta in [`.claude/docs/`](.claude/docs/), con
[`CLAUDE.md`](CLAUDE.md) come punto d'ingresso.
