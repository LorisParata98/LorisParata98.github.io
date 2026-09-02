import { provideHttpClient, withFetch } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {
  appInitializerFactory,
  TranslocoHttpLoader,
} from './i18n/transloco-loader';
export const appConfig: ApplicationConfig = {
  providers: [
    // Il transfer cache serializzerebbe nell'HTML prerenderizzato l'intero
    // iconset MDI scaricato da MatIconRegistry (~3 MB per pagina)
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        // options: {
        //   cssLayer: {
        //     name: 'primeng',
        //     order: 'base, primeng, utilities',
        //   },
        // },
      },
    }),
    provideTransloco({
      config: {
        defaultLang: 'it',
        availableLangs: ['it', 'en'],
        failedRetries: 2,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslocoService],
      multi: true,
    },
    // Firebase Cloud Messaging: disattivato.
    // Per riattivarlo servono ENTRAMBE le righe, ed è codice solo browser
    // (getMessaging() non funziona in Node, quindi rompe il prerender):
    //   provideFirebaseApp(() => initializeApp(environment.firebase)),
    //   provideMessaging(() => getMessaging()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: typeof navigator !== 'undefined' && 'serviceWorker' in navigator,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
