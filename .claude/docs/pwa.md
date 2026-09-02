# PWA, service worker e notifiche

## Service worker Angular (ngsw)

Registrato in `app.config.ts`:

```ts
provideServiceWorker('ngsw-worker.js', {
  enabled: typeof navigator !== 'undefined' && 'serviceWorker' in navigator,
  registrationStrategy: 'registerWhenStable:30000',
})
```

Attenzione: `enabled` **non** controlla `isDevMode()`, quindi il service worker
si registra anche in sviluppo se il file è presente. In `ng serve` il file non
viene generato, quindi in pratica non si attiva; se vedi cache anomale in locale,
svuota Application → Service Workers nei DevTools.

`ngsw-config.json` (root):

- **assetGroup `app`** — `prefetch`: `index.html`, `index.csr.html`,
  `manifest.webmanifest`, `*.css`, `*.js`
- **assetGroup `assets`** — `lazy` + `updateMode: prefetch`: immagini e font
- **`navigationUrls`** — esclude esplicitamente `/**/firebase-messaging-sw.js`
  così il ngsw non intercetta il worker di Firebase

Le traduzioni **non** sono in un assetGroup: sono servite via HTTP con
cache-buster dal `TranslocoHttpLoader`.

## Flusso di aggiornamento

`AppUpdateService` (`services/app-update.service.ts`):

1. Si abbona a `swUpdate.versionUpdates` filtrando `VERSION_READY`.
2. Alza il signal `updateAvailable` → `UpdatePromptComponent` (montato in
   `AppComponent`) mostra il prompt.
3. `applyUpdate()` → `activateUpdate()` poi `document.location.reload()`.
4. `dismiss()` non annulla l'update: lo rimanda alla **prossima** `NavigationEnd`.
5. Ricontrolla con `checkForUpdate()` ogni 30 minuti (`CHECK_INTERVAL_MS`).

Se modifichi la logica di update, tieni presente che `dismiss()` ha un effetto
differito: sembra un "no" ma è un "dopo".

## Installazione

`PwaInstallService` (`services/pwa-install.service.ts`):

- Intercetta `beforeinstallprompt`, fa `preventDefault()` e conserva l'evento →
  `canInstall$`.
- Ascolta `appinstalled` → `isInstalled$`.
- Rileva lo standalone con `matchMedia('(display-mode: standalone)')` e
  `(navigator as any).standalone` (iOS).
- Fornisce istruzioni per piattaforma, con il campo `limitations` per iOS.
- Tutto è protetto da `isPlatformBrowser`.

Componenti collegati: `InstallButtonComponent`, `PwaInstallPromptComponent`,
`IosInstallBannerComponent` (banner "Aggiungi a Home" specifico Safari iOS).

## Manifest

`public/manifest.webmanifest` è l'unico manifest: referenziato da `index.html`
(`<link rel="manifest">`) e prefetchato dal ngsw. Modificando nome, icone o
`theme_color`, aggiorna quello.

Nota: `"display": "browser"`. Con questo valore Chrome non offre l'installazione
standard e su iOS le notifiche push non funzionano (richiedono standalone).
Per una PWA installabile a tutti gli effetti va portato a `"standalone"` — è una
scelta di prodotto, non un bug: cambia come il sito si apre per chi lo installa.

## Notifiche push (Firebase Cloud Messaging)

Stack installato ma **disattivato**. In `app.config.ts` sia
`provideFirebaseApp(() => initializeApp(environment.firebase))` sia
`provideMessaging(() => getMessaging())` sono commentati.

Vanno riattivati **insieme**: `provideMessaging` da solo solleva un errore
perché non esiste un'app Firebase inizializzata. Inoltre `getMessaging()` non
funziona in Node, quindi così com'è romperebbe il prerender (`NG0401`): se
riattivi FCM, i provider vanno inclusi solo lato browser.

Restano da montare anche i componenti: `NotificationsButtonComponent` è
commentato in `HomeComponent`.

`src/firebase-messaging-sw.js` è il worker per i messaggi in background, copiato
come asset e escluso dai `navigationUrls` del ngsw.

`PushNotificationService` espone `isNotificationSupported()`, `isIOS()`,
`getToken()`, `listenToMessages()` e la Badge API
(`incrementNotificationBadge` / `clearNotificationBadge`).

**Debito noto:** `getToken()` usa `alert()` per successo ed errore. Se lavori su
quel file, sostituiscili con il sistema di prompt esistente.

`NotificationService` (`src/app/notification-service.service.ts`, fuori dalla
cartella `services/`) è un wrapper separato su `SwPush` usato per le notifiche di
test. Duplica in parte `PushNotificationService`.

## Limitazioni iOS

Documentate in `PWA_NOTIFICATIONS_iOS_FIXES.md` (changelog storico, non una spec).
In sintesi:

- Le notifiche push funzionano solo con app installata in **modalità standalone**.
- Il permesso non va richiesto fuori dallo standalone (comportamenti imprevisti).
- Non esiste `beforeinstallprompt`: l'installazione è manuale via "Condividi →
  Aggiungi a Home", da cui `IosInstallBannerComponent`.

## Testare la PWA in locale

`ng serve` non genera il service worker. Serve una build servita staticamente:

```bash
npm run build-prod
npm run serve:dist     # http-server su :8080
```

Poi apri `http://localhost:8080` e controlla Application → Service Workers /
Manifest nei DevTools.
