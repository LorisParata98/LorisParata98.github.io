# Convenzioni di codice

## Componenti

Template di riferimento per un componente nuovo:

```ts
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-nome-componente',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './nome-componente.component.html',
  styleUrl: './nome-componente.component.scss',
})
export class NomeComponenteComponent {
  // input/output signal-based
  data = input.required<Tipo>();
  variante = input<'a' | 'b'>('a');
  select = output<Tipo>();

  // stato locale
  private readonly _service = inject(QualcheService);
  aperto = signal(false);

  // derivato
  etichetta = computed(() => this.data().nome.toUpperCase());
}
```

Regole:

- `standalone: true` sempre, `imports` esplicito. Nessun `NgModule`.
- `styleUrl` (singolare, Angular 17+), non `styleUrls`.
- Selettore `app-kebab-case`, classe `PascalCaseComponent`, file
  `kebab-case.component.{ts,html,scss}` in una cartella con lo stesso nome.
- `input()` / `input.required()` / `output()`. I decoratori `@Input()` e
  `@Output()` non vanno usati nel codice nuovo.
- `inject()` nei componenti nuovi. Il constructor injection resta in
  `HeaderComponent`, `HomeComponent`, `AppComponent` — non serve migrarli, ma non
  replicare quel pattern.
- Membri privati iniettati: `private readonly _nome` oppure `private readonly nome`
  (entrambi presenti nel repo; scegli quello del file che stai modificando).

## Stato e reattività

- Stato locale del componente: `signal()`.
- Valore derivato: `computed()`. Non ricalcolarlo dentro il template né in un
  getter.
- Stato globale condiviso: servizio `providedIn: 'root'` con `BehaviorSubject`
  o `signal()`, letto dai componenti con `toSignal()`.
- `effect()` solo per side effect (reset di filtri, sincronizzazione DOM). Non
  usarlo per calcolare valori.
- Le subscription RxJS nei componenti vanno preferibilmente sostituite da
  `toSignal()`; quelle che restano devono essere chiuse (`takeUntilDestroyed`) se
  il componente non vive per tutta la sessione.

## Template

- Nessun testo hardcoded: `{{ 'chiave.i18n' | transloco }}`.
- Control flow nuovo (`@if`, `@for`, `@switch`) nei template nuovi; `*ngIf` e
  `*ngFor` restano nei template esistenti.
- `@for` richiede sempre `track`.
- Path immagini relativi: `assets/images/projects/<slug>/1.webp`.
  Mai iniziare con `/`.
- `strictTemplates` è attivo: gli input opzionali possono essere `undefined`,
  gestiscilo (`?.`, `??`) invece di castare.

## Codice che gira anche in Node

Le rotte vengono prerenderizzate a build time, quindi componenti e servizi
vengono istanziati anche in Node. Regole:

- `window`, `navigator`, `localStorage`, `matchMedia`, `canvas`: solo dietro
  `isPlatformBrowser(inject(PLATFORM_ID))`.
- Per il DOM usa `inject(DOCUMENT)`, mai il `document` globale.
- Niente loop di `setTimeout` / `setInterval` non guardati nei lifecycle hook:
  tengono l'applicazione instabile e bloccano la generazione dell'HTML.
- Le richieste HTTP con URL relativi falliscono sul server.

```ts
private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
private readonly _document = inject(DOCUMENT);

ngAfterViewInit(): void {
  if (!this._isBrowser) return;
  // ...codice browser
}
```

Se la build fallisce con `NG0401` durante l'estrazione delle rotte, è quasi
sempre questo.

## TypeScript

`tsconfig.json` ha `strict: true`, `noImplicitOverride`, `noImplicitReturns`,
`noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`.

Conseguenze pratiche:

- Dati di rotta: `route.data['title']`, mai `route.data.title`.
- Ogni ramo di funzione deve ritornare.
- Evita `any`. Nel repo esiste (`payload: any` in `PushNotificationService`,
  cast `as any` per `offsetTop`): non aggiungerne di nuovi.

## Stile

- SCSS. Colori e font **sempre** da custom property (`var(--accent)`,
  `var(--black02)`, `var(--font-family-titles)`), mai valori hex inline.
- Tailwind è disponibile per utility di layout/spacing. I componenti Tailwind
  (`@tailwind components`) sono disattivati: non affidarti a `.btn`, `.card`, ecc.
- Per modificare un componente PrimeNG, edita il partial dedicato in
  `public/assets/theme/_<componente>.scss` invece di sovrascrivere con `!important`
  dal componente.
- Breakpoint di riferimento: `991px` (`LayoutService.isDesktop()`), più i
  breakpoint Tailwind `md` / `lg`.

## Icone

- Icone MDI: `<mat-icon svgIcon="nome-mdi">`. L'iconset è registrato una sola
  volta in `HeaderComponent` da `./assets/mdi.svg`.
- Icone PrimeNG: classi `pi pi-*`.
- Loghi tecnologici custom: componenti standalone in
  `components/tecnology-skills/icons/` (es. `angular-icon.component.ts`) che
  incapsulano un SVG inline.

## Aggiungere un componente

1. Crea la cartella sotto `src/app/components/` (o dentro il componente padre se
   è un figlio dedicato, come `projects/project-card/`).
2. Tre file: `.ts`, `.html`, `.scss`.
3. Aggiungi le chiavi i18n in `it.json` **e** `en.json`.
4. Importa il componente nell'array `imports` del padre.
5. `npm run build-prod` per verificare.

Non usare `ng generate`: crea spec file e non rispetta il layout delle cartelle
figlie usato qui.

## Test

Karma + Jasmine, eseguiti in CI con `npm run test:ci` (headless, senza watch).
La copertura è minima: 7 test, quasi tutti su `AppComponent`. La verifica reale
resta la build, che con il prerender esercita l'app end-to-end.

Non aggiungere spec vuoti ai nuovi componenti. Se scrivi un test, deve passare:
la pipeline si ferma se fallisce.

Il TestBed di un componente che monta l'header ha bisogno almeno di
`provideRouter([])`, `provideHttpClient()`, `provideNoopAnimations()`,
`provideServiceWorker(..., { enabled: false })` e un `provideTransloco` con un
loader stub — vedi `src/app/app.component.spec.ts`.

## Commit

`tipo(scope) messaggio` in inglese minuscolo, come da storia del repo:

```
feat(projects) add mobile drawer
feat(home) add figma icon
fix(global) translations and redirect
update(projects) change description
```

Scope usati: `home`, `projects`, `project`, `global`, `notifications`,
`service worker`. I due punti dopo lo scope sono opzionali (il repo è misto).
Commit e push solo se richiesti esplicitamente.

## Lingua

- Codice, nomi di variabili e commit: inglese.
- Commenti nel codice e documentazione: italiano (coerente con l'esistente).
- Il modello dati usa nomi italiani già consolidati (`nome`, `descrizione`,
  `anno`): mantienili, non tradurli.
