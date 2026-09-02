# CLAUDE.md

Guida operativa per agenti che lavorano su questo repository.

## Cos'è il progetto

Portfolio personale di Loris Parata (`LorisParata98.github.io`): SPA Angular 19
standalone, PWA installabile, bilingue (it/en), prerenderizzata come HTML statico
e deployata su GitHub Pages.

Il sito ha due sezioni principali:

- `/` — home one-page (presentazione, experience summary, portfolio, esperienze
  lavorative, skill tecniche, contatti)
- `/projects` — griglia progetti con filtri per tag, carousel immagini e drawer
  di dettaglio (case study design + dev)

Il tutto è filtrato da una **portfolio mode** globale (`all` | `design` | `dev`)
che cambia contenuti, tag evidenziati e accent color.

## Comandi

| Comando | Cosa fa |
| --- | --- |
| `npm start` | dev server su **porta 4201** |
| `npm run serve:lan` | dev server su 0.0.0.0:4200 (test da mobile in LAN) |
| `npm run serve:dist` | serve `dist/browser` su :8080 (unico modo di testare la PWA) |
| `npm run serve:stop` | killa la porta 4200 |
| `npm run build-prod` | `ng build` — build production **+ prerender**. È quella usata dalla CI |
| `npm run build` | equivalente, con i flag espliciti |
| `npm run watch` | build development in watch |
| `npm run test:ci` | Karma headless, senza watch. **Usa questo**, non `npm test` |
| `npm test` | Karma in watch mode, apre Chrome |

Output build: `dist/browser`, con `index.html` e `projects/index.html`
prerenderizzati.

## Stack

- **Angular 19** — standalone components, signals, nessun `NgModule`
- **PrimeNG 19** + preset tema `Aura` (`providePrimeNG` in `app.config.ts`)
- **Angular Material** — usato **solo** per `MatIcon` con l'iconset MDI
  (`assets/mdi.svg`, registrato in `HeaderComponent`)
- **Tailwind 3.4** (`@tailwind base` + `utilities`, i componenti Tailwind sono
  disattivati) + SCSS con custom properties
- **Transloco** (`@jsverse/transloco`) per i18n it/en
- **@angular/service-worker** (`ngsw`) per PWA e update prompt
- **@angular/ssr** — solo per il prerender in fase di build, non c'è un server
- **@angular/fire** (messaging/FCM) — installato ma **disattivato** in
  `app.config.ts`
- Chart.js per il radar chart delle competenze

## Regole non negoziabili

1. **Componenti sempre `standalone: true`.** Mai creare `NgModule`.
2. **Nessuna stringa UI hardcoded nei template.** Ogni testo passa da Transloco
   (`| transloco` o `TranslocoService.translate`) con la chiave aggiunta in
   **entrambi** `public/assets/i18n/it.json` e `public/assets/i18n/en.json`.
3. **API signal-first**: `input()` / `output()` / `signal()` / `computed()` /
   `toSignal()`. Non usare i decoratori `@Input()` / `@Output()` nel codice nuovo.
4. **Il codice deve girare anche in Node.** Le rotte vengono prerenderizzate a
   build time: qualsiasi accesso a `window`, `navigator`, `localStorage`,
   `canvas` o a un loop di `setTimeout` va protetto con
   `isPlatformBrowser(inject(PLATFORM_ID))`. Per il DOM usa `inject(DOCUMENT)`,
   non il `document` globale. Se la build fallisce con `NG0401` durante
   l'estrazione delle rotte, è codice browser eseguito sul server.
5. **`strictTemplates` e `strict` sono attivi.** Anche
   `noPropertyAccessFromIndexSignature`: accedere ai dati di rotta con
   `route.data['title']`, mai `route.data.title`.
6. **Path asset senza slash iniziale**: `assets/images/...`. Il `<base href="/">`
   e il deploy su Pages fanno il resto; un `/assets/...` rompe i path relativi.
7. **Template e stili in file separati** (`templateUrl` + `styleUrl`), selettore
   con prefisso `app-`.
8. Non toccare `dist/`, `.angular/`, `node_modules/`.

## Dove sta cosa

```
src/
├── main.ts                  bootstrap browser
├── main.server.ts           bootstrap per il prerender (richiede BootstrapContext)
├── index.html               meta SEO, Open Graph, JSON-LD, redirect SPA
└── app/
    ├── app.config.ts        provider globali (router, transloco, primeng, sw)
    ├── app.config.server.ts config prerender + loader i18n da filesystem
    ├── app.routes.ts        rotte lazy + metadati SEO in `data`
    ├── animations.ts        trigger Angular animations condivisi (fadeInUp)
    ├── components/          tutti i componenti UI (uno per cartella)
    ├── data/projects.data.ts contenuto di tutti i progetti (~1800 righe)
    ├── models/project.model.ts tipi Project / ProjectVariant / DrawerContent
    ├── guards/seo.guard.ts  allinea title e meta tag alla rotta attiva
    ├── i18n/transloco-loader.ts loader HTTP + APP_INITIALIZER
    └── services/            stato globale e integrazioni
public/assets/i18n/          it.json / en.json (traduzioni)
public/assets/images/        immagini progetti, una cartella per progetto
public/assets/theme/         override SCSS PrimeNG (_buttons, _drawer, ...)
public/404.html              redirect SPA per GitHub Pages
public/robots.txt            + sitemap.xml
src/assets/theme.scss        design token (CSS custom properties)
```

## Documentazione di dettaglio

Leggila **prima** di lavorare sull'area corrispondente:

- [Architettura](.claude/docs/architecture.md) — flussi, layer, boot, prerender
- [Convenzioni](.claude/docs/conventions.md) — stile codice, naming, commit
- [Modello dati progetti](.claude/docs/data-model.md) — come aggiungere/modificare un progetto
- [i18n](.claude/docs/i18n.md) — Transloco, chiavi, HTML nelle traduzioni
- [PWA & notifiche](.claude/docs/pwa.md) — service worker, update, install, iOS
- [SEO](.claude/docs/seo.md) — meta tag, prerender, sitemap
- [Deploy](.claude/docs/deployment.md) — GitHub Actions, Pages, SPA redirect
- [Stato noto e debiti tecnici](.claude/docs/known-issues.md) — leggi prima di "correggere" stranezze

Per aggiungere un progetto al portfolio ci sono due skill, scelte in base a cosa
hai in mano:

- [`material-import`](.claude/skills/material-import/SKILL.md) — parti da una
  **cartella di materiale** (screenshot, export, brief): inventaria, converte le
  immagini in webp e compone la voce `Project`
- `project-intake` — parti dal **repository o dall'URL** del progetto: estrae le
  evidenze dal codice, compone la voce e cattura screenshot e GIF. Installata a
  livello utente in `~/.claude/skills/project-intake/`

## Verifica prima di consegnare

Non esiste linter configurato. Il gate minimo è:

```bash
npm run build-prod    # strictTemplates + prerender: intercetta quasi tutto
npm run test:ci
```

Il prerender è il controllo più severo che hai: se una modifica introduce codice
browser non protetto, la build fallisce. Se hai toccato i18n, controlla che
`it.json` ed `en.json` abbiano le stesse chiavi (`/i18n-check`).

## Commit

Formato usato nel repo: `tipo(scope) messaggio` in inglese minuscolo.

```
feat(projects) add mobile drawer
fix(global) translations and redirect
update(projects) change description
```

Scope tipici: `home`, `projects`, `project`, `global`, `notifications`,
`service worker`, `seo`, `ci`. Non aggiungere commit o push se non richiesto
esplicitamente.
