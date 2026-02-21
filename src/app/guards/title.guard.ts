import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const titleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const titleService = inject(Title);
  const pageTitle = route.data['title']
    ? `${route.data['title']} | LRS Design`
    : 'LRS Design';

  titleService.setTitle(pageTitle);
  return true;
};
