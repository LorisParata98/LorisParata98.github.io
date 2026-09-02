# Stato noto e debiti tecnici

Cose che sembrano bug ma sono voluti, e cose che sono bug ma non vanno "corrette
di passaggio". Leggi prima di riordinare codice che non ti è stato chiesto di
toccare.

## Voluto / non toccare senza motivo

| Cosa | Perché |
| --- | --- |
| Script inline in `index.html` e `public/404.html` | Redirect SPA per GitHub Pages, fallback per i path non prerenderizzati ([deployment.md](./deployment.md)) |
| `withNoHttpTransferCache()` in `app.config.ts` | Senza, il prerender serializza l'iconset MDI nell'HTML: ~3 MB per pagina |
| Il `BootstrapContext` passato in `src/main.server.ts` | Obbligatorio: senza, la build fallisce con `NG0401` |
| Loader Transloco separato in `app.config.server.ts` | Sul server una GET relativa non risolve ([i18n.md](./i18n.md)) |
| Cache-buster `?cb=Date.now()` nel loader Transloco | Evita che il service worker serva traduzioni obsolete dopo un deploy |
| `seoGuard` che ritorna sempre `true` | Non è un controllo di accesso: è un side effect per i meta tag |
| Le guardie `isPlatformBrowser` in `PresentationComponent` e `ExperienceSummaryComponent` | Senza, il prerender si blocca (loop di `setTimeout`) o esplode (canvas inesistente) |
| Nomi italiani nel modello (`nome`, `descrizione`, `anno`) | Consolidati in ~1800 righe di dati. Rinominarli è un refactor a sé |
| `dismiss()` in `AppUpdateService` che applica l'update alla navigazione dopo | Comportamento voluto: rimanda, non annulla |
| Le tre chiavi `variants.all/design/dev` duplicate su alcuni progetti | Il tipo le richiede tutte; la duplicazione è intenzionale |

## Debiti tecnici aperti

**Manca l'immagine social.** `og:image` punta a `icons/icon-512x512.png`: è
quadrata e mostra solo il logo. Serve una `public/og-image.png` da 1200×630
([seo.md](./seo.md)). È l'intervento con il ritorno più visibile rimasto.

**`manifest.webmanifest` ha `"display": "browser"`**, che impedisce
l'installazione standard e, su iOS, le notifiche push. Portarlo a `"standalone"`
è una decisione di prodotto, non una correzione tecnica.

**Firebase / FCM disattivato.** `provideFirebaseApp` e `provideMessaging` sono
entrambi commentati in `app.config.ts`. Vanno riattivati insieme e solo lato
browser, altrimenti rompono il prerender ([pwa.md](./pwa.md)).

**Due servizi di notifica.** `services/notification.service.ts`
(`PushNotificationService`, FCM) e `notification-service.service.ts`
(`NotificationService`, `SwPush`) si sovrappongono. Il secondo è fuori dalla
cartella `services/`.

**`alert()` in produzione.** `PushNotificationService.getToken()` usa `alert()`
sia per il successo sia per l'errore.

**`EmailService` è uno stub vuoto.** `ContactMeComponent` usa un link `mailto:`,
quindi il servizio non serve a niente.

**`public/assets/theme.css`** è una versione compilata che sta accanto ai
sorgenti SCSS. Nessuno la importa.

**i18n disallineato:** 283 chiavi in `it.json`, 209 in `en.json`. 78 mancanti in
`en` (quasi tutte sotto `primeng.*`, che non è collegato), 4 in `it`
([i18n.md](./i18n.md)).

**Porte incoerenti:** `npm start` usa la 4201, `serve:lan` la 4200,
`.vscode/launch.json` punta alla 4200.

**Test:** 7 test, tutti su `AppComponent` o generati dallo schematic. Girano in
CI e passano, ma coprono pochissimo. Il gate vero resta la build.

**Niente linter.** Nessun ESLint/Prettier configurato: lo stile va dedotto dai
file vicini.

**`environment.ts` contiene la config Firebase in chiaro.** Sono le chiavi web
pubbliche di FCM (per design visibili nel bundle), quindi non è un leak di
credenziali. Il controllo di sicurezza va fatto lato regole Firebase, non
nascondendo il file. Non aggiungere invece chiavi private o token di servizio in
`src/environments/`: finiscono nel bundle pubblico.

**`@primeng/themes` è alla `^21.0.4`** mentre `primeng` è alla `^19.1.4`. Oggi
funziona, ma è un accoppiamento di major diverse: se compaiono stranezze di tema,
guarda lì per primo.

## Risolto (settembre 2026)

Per non ri-segnalarli: CI senza `setup-node`, bundle senza code splitting,
assenza di meta tag SEO / robots / sitemap, `@tailwindcss/postcss` v4 inutilizzato,
`README.md` vuoto, `src/server.ts` + `express` morti, duplicati
`src/ngsw-config.json` e `src/manifest.json`, `src/app/test.nojekyll`,
`transloco.config.ts` con il path sbagliato, `smtpjs` caricato e mai usato,
`title` sovrascritto da `AppComponent` e `HomeComponent`, spec di
`AppComponent` che non compilava, dipendenze `gsap` e
`@angular/platform-browser-dynamic` inutilizzate.

## Se vuoi ripulire

Chiedi prima. Sono modifiche a basso rischio ma fuori dallo scope di qualsiasi
task funzionale, e la suite di test copre poco.
