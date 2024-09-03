import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader, TranslocoService } from '@jsverse/transloco';

import { PrimeNGConfig } from 'primeng/api';
import { lastValueFrom, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(
        private _http: HttpClient,
        private _primengConfig: PrimeNGConfig
    ) { }

    getTranslation(lang: string) {
        debugger
        return this._http
            .get<Translation>(`/assets/i18n/${lang}.json`)
            .pipe(
                tap((translation: Translation) => {
                    this._primengConfig.setTranslation(translation['primeng']);
                })
            );
    }
}
//Serve per caricare la prima volta le traduzioni
export function appInitializerFactory(translateService: TranslocoService) {
    return (): Promise<Translation> => {
        const defaultLang = translateService.getDefaultLang();
        translateService.setActiveLang(defaultLang);
        translateService.getTranslation(defaultLang)
        return lastValueFrom(translateService.load(defaultLang))
    }
}



