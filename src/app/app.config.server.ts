import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import {
  Translation,
  TranslocoLoader,
  TRANSLOCO_LOADER,
} from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import { appConfig } from './app.config';

import en from '../../public/assets/i18n/en.json';
import it from '../../public/assets/i18n/it.json';

/**
 * Durante il prerender non esiste un server HTTP da cui scaricare le
 * traduzioni: il loader di default (`TranslocoHttpLoader`) fallirebbe su una
 * URL relativa. Qui le traduzioni vengono servite dai JSON importati a build
 * time. Questo file finisce solo nel bundle server, quindi il bundle browser
 * resta invariato.
 */
class ServerTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    const translations: Record<string, Translation> = {
      it: it as Translation,
      en: en as Translation,
    };
    return of(translations[lang] ?? (it as Translation));
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: TRANSLOCO_LOADER, useClass: ServerTranslocoLoader },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
