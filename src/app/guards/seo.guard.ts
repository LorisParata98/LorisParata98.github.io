import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { SeoService } from '../services/seo.service';

const DEFAULT_DESCRIPTION =
  'Portfolio di Loris Parata, designer e sviluppatore web. Progetto e realizzo applicazioni web e mobile curando esperienza utente, interfaccia e implementazione.';

/**
 * Non è un controllo di accesso: ritorna sempre true.
 * È il punto in cui i metadati SEO vengono allineati alla rotta attiva,
 * leggendo `title` e `description` da `route.data`.
 */
export const seoGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const seo = inject(SeoService);

  seo.update({
    title: (route.data['title'] as string | undefined) ?? 'Home',
    description:
      (route.data['description'] as string | undefined) ?? DEFAULT_DESCRIPTION,
    path: route.routeConfig?.path ?? '',
  });

  return true;
};
