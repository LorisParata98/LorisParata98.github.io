# Architettura

## Quadro generale

SPA Angular 19 senza backend: tutti i contenuti sono costanti TypeScript o file
JSON serviti come asset statici. Le due rotte vengono **prerenderizzate in HTML
a build time** (`outputMode: "static"`), quindi il primo paint non aspetta il
JavaScript e i crawler vedono il contenuto reale; da lì in poi Angular fa
hydration e l'app funziona come una normale SPA.

```
   build ──▶ ng build  ──┬──▶ bundle browser (main + chunk lazy)
                         └──▶ prerender ──▶ index.html
                                            projects/index.html

                     ┌──────────────────────────────┐
   GitHub Pages  ───▶│ dist/browser (statico)       │
                     │  HTML prerenderizzato + sw   │
                     └──────────────┬───────────────┘
                                    │ hydration
                     ┌──────────────▼───────────────┐
                     │ AppComponent                 │
                     │  Header + <router-outlet>    │
                     │  + UpdatePrompt              │
                     └──────┬───────────────┬───────┘
                            │               │
                  HomeComponent      ProjectsComponent
                  (lazy chunk)       (lazy chunk)
```

## Boot sequence

1. `src/main.ts` chiama `bootstrapApplication(AppComponent, appConfig)`.
   In fase di prerender l'entry point è invece `src/main.server.ts`, che **deve**
   passare il `BootstrapContext` ricevuto:
   `bootstrapApplication(AppComponent, config, context)`. Senza, la build
   fallisce con `NG0401` (`PLATFORM_NOT_FOUND`).
2. `app.config.ts` registra i provider:
   - `provideClientHydration(withNoHttpTransferCache())` — il transfer cache è
     disattivato di proposito: serializzava nell'HTML l'intero iconset MDI
     scaricato da `MatIconRegistry`, ~3 MB per pagina
   - `provideHttpClient(withFetch())`
   - `provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))`
   - `provideAnimations()`
   - `providePrimeNG({ theme: { preset: Aura } })`
   - `provideTransloco({ defaultLang: 'it', availableLangs: ['it','en'] })`
   - `APP_INITIALIZER` con `appInitializerFactory`: **blocca il boot finché il
     bundle di traduzioni della lingua di default non è caricato**
   - `provideServiceWorker('ngsw-worker.js', { registrationStrategy: 'registerWhenStable:30000' })`
   - FCM (`provideFirebaseApp` + `provideMessaging`) è commentato: vedi
     [known-issues.md](./known-issues.md)
3. `app.config.server.ts` aggiunge, solo per il prerender,
   `provideServerRendering()` e un `TRANSLOCO_LOADER` che legge i JSON importati
   a build time invece di fare una richiesta HTTP che sul server non risolverebbe.
4. `AppComponent` si abbona a `PortfolioModeService` e toggla la classe
   `mode-dev` sul `<body>` (via `inject(DOCUMENT)`, così funziona anche in Node).

## Routing

`app.routes.ts`, due sole rotte più wildcard, entrambe **lazy** via
`loadComponent`:

| path | component | data | guard |
| --- | --- | --- | --- |
| `''` | `HomeComponent` (lazy) | `{ title: 'Home', description }` | `seoGuard` |
| `projects` | `ProjectsComponent` (lazy) | `{ title: 'Progetti', description }` | `seoGuard` |
| `**` | redirect a `''` | | |

Il lazy loading non serve a rimandare il caricamento (le pagine sono due), ma a
tenere fuori dal bundle iniziale `projects.data.ts` e le dipendenze pesanti di
ciascuna pagina.

`seoGuard` (`guards/seo.guard.ts`) è un `CanActivateFn` usato **solo** come side
effect: legge `title` e `description` da `route.data` e li passa a `SeoService`,
che aggiorna titolo, meta description, Open Graph, Twitter card e canonical.
Ritorna sempre `true`.

Su GitHub Pages i deep link a rotte prerenderizzate vengono serviti direttamente
(`projects/index.html`). Per qualunque altro path interviene `public/404.html`,
che riscrive il path in query string; lo script inline in `index.html` lo
ripristina con `history.replaceState` prima del bootstrap.

## Portfolio mode: il concetto centrale

`PortfolioModeService` (`services/portfolio-mode.service.ts`) espone un
`BehaviorSubject<'all' | 'design' | 'dev'>`. È il singolo pezzo di stato globale
che attraversa tutta l'app.

Effetti a cascata:

| Consumatore | Effetto |
| --- | --- |
| `AppComponent` | aggiunge/rimuove `body.mode-dev`, che cambia `--accent` da giallo `#f5c400` a blu `#4a9eff` |
| `ProjectsComponent` | seleziona `project.variants[mode]`, ricalcola l'elenco tag, resetta i filtri via `effect()` |
| `ProjectCardComponent` | sceglie descrizione, tag e quali tag evidenziare |
| `ProjectDrawerComponent` | sceglie il case study (`drawerContent.design` oppure `.dev`) |
| Chiavi i18n | `projects.hero.<mode>.titleHtml`, `toggle.badge.<mode>` |

I componenti leggono la mode con
`toSignal(modeService.currentMode$, { initialValue: 'all' })` e la propagano ai
figli come `input()`. `PortfolioToggleComponent` è l'unico che scrive
(`setMode`), ed è renderizzato sia nell'header sia nella pagina progetti.

## Layer dei componenti

```
AppComponent
├── HeaderComponent ──────── PortfolioToggleComponent
│     usa LayoutService (menuItems, isMenuOpen) + TranslocoService
│     registra l'iconset MDI in MatIconRegistry
├── UpdatePromptComponent ── AppUpdateService
└── router-outlet
    ├── HomeComponent
    │   ├── PresentationComponent
    │   ├── ExperienceSummaryComponent
    │   ├── ProjectsPortfolioComponent   (preview progetti in home)
    │   ├── WorkExperiencesComponent ─── ExperienceItemComponent
    │   ├── TecnologySkillsComponent ─── SkillCardComponent + icons/*
    │   └── ContactMeComponent
    └── ProjectsComponent
        ├── PortfolioToggleComponent
        ├── CarouselComponent            (immagini progetto)
        ├── ProjectDrawerComponent ───── DrawerContentBlockComponent
        └── PrimeNG Drawer + Listbox     (filtri tag, sidebar mobile)
```

Componenti PWA standalone, montati dove servono:
`InstallButtonComponent`, `IosInstallBannerComponent`,
`PwaInstallPromptComponent`, `NotificationsButtonComponent`,
`NotificationStatusComponent`.

## Servizi

| Servizio | Responsabilità | Tipo di stato |
| --- | --- | --- |
| `PortfolioModeService` | mode globale | `BehaviorSubject` |
| `LayoutService` | voci di menu, apertura menu, breakpoint 991px | `signal()` |
| `AppUpdateService` | `SwUpdate`: rileva `VERSION_READY`, ricontrolla ogni 30 min, applica al reload o alla navigazione successiva | `signal()` |
| `PwaInstallService` | intercetta `beforeinstallprompt`, rileva standalone/iOS, istruzioni per piattaforma | `BehaviorSubject` |
| `PushNotificationService` | FCM: token, `onMessage`, Badge API | `BehaviorSubject` |
| `NotificationService` | wrapper `SwPush` + Notification API (usato per i test) | — |
| `SeoService` | title, meta description, Open Graph, Twitter card, canonical per rotta | — |
| `GsapServiceService` | helper `isOnBrowser()` / `isOnServer()` per codice SSR-sensitive | — |
| `EmailService` | **stub vuoto** | — |

Tutti sono `providedIn: 'root'`.

## Dati

I contenuti non stanno in un CMS: `src/app/data/projects.data.ts` esporta
`allProjects: Project[]` (~1800 righe). È importato **solo** da
`ProjectsComponent`, quindi finisce nel chunk lazy della pagina progetti e non
nel bundle iniziale: se lo importi altrove, lo riporti nel main bundle. I tipi
stanno in `models/project.model.ts`. Dettagli in [data-model.md](./data-model.md).

`ProjectsComponent` deriva tutto con `computed()`:
elenco tag disponibili, filtri attivi, progetti filtrati, raggruppamento per anno
(`YearSection`). Non c'è uno store: solo signal derivati.

## i18n

`TranslocoHttpLoader` carica `./assets/i18n/<lang>.json` con un cache-buster
(`?cb=Date.now()`). L'`APP_INITIALIZER` attende il caricamento della lingua di
default, quindi al primo paint non compaiono chiavi grezze.
Dettagli in [i18n.md](./i18n.md).

## Styling: i quattro livelli

Applicati in quest'ordine. Quando aggiungi stile, parti dal livello più alto che
risolve il problema.

1. **Design token** — `src/assets/theme.scss`: custom properties su `:root`
   (`--black0x`, `--gray0x`, `--font-family`, `--font-family-titles`, ...).
2. **Override PrimeNG** — `public/assets/theme/_*.scss`, importati da
   `theme.scss`. Un file per componente PrimeNG (`_buttons`, `_drawer`,
   `_dialog`, `_dropdown`, ...).
3. **Globale** — `src/styles.scss`: import font, direttive Tailwind, accent color
   e scala tipografica `h1..h6` dentro `@layer base`.
4. **Componente** — `*.component.scss` accanto al componente.

L'accent color è l'unico token che cambia a runtime:

```scss
:root         { --accent: #f5c400; }  /* mode all / design */
body.mode-dev { --accent: #4a9eff; }  /* mode dev */
```

Le variabili PrimeNG (`--p-primary-color`, `--p-focus-ring-color`, ...) sono
mappate su `--accent`, quindi cambiare mode ritinge anche i componenti PrimeNG.

## Prerender

`angular.json` usa `outputMode: "static"` con `server: "src/main.server.ts"`:
in fase di build Angular esegue l'applicazione in Node, visita le rotte e scrive
l'HTML risultante in `dist/browser`. **Non esiste un server a runtime**: il
deploy resta un insieme di file statici.

Conseguenze da tenere a mente:

- Il codice eseguito al bootstrap e nei lifecycle hook gira **anche in Node**.
  `window`, `navigator`, `localStorage`, `canvas` non esistono. Servono le
  guardie `isPlatformBrowser(inject(PLATFORM_ID))` e `inject(DOCUMENT)` al posto
  del `document` globale.
- Un loop di `setTimeout` non guardato tiene l'applicazione instabile e blocca la
  generazione dell'HTML. Per questo il typewriter di `PresentationComponent` e il
  chart di `ExperienceSummaryComponent` partono solo nel browser.
- Le richieste HTTP con URL relativi falliscono. Per questo il caricamento delle
  traduzioni sul server passa da un loader dedicato in `app.config.server.ts`.
- `withNoHttpTransferCache()` evita che le risposte HTTP del prerender finiscano
  serializzate nell'HTML.

Se la build fallisce con `NG0401` ("An error occurred while extracting routes"),
il messaggio è generico: quasi sempre è codice browser eseguito sul server, o un
provider che esplode al bootstrap.

## Build e deploy

`.github/workflows/main.yaml`, su push a `main`: `npm ci`, `npm run build-prod`,
upload di `dist/browser`, `deploy-pages`. Dettagli in
[deployment.md](./deployment.md).
