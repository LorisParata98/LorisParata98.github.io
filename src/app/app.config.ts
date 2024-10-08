import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';


import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { routes } from './app.routes';
import { appInitializerFactory, TranslocoHttpLoader } from './i18n/transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [

    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideRouter(routes),

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
      multi: true
    },
  ],
};
