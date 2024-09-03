// src/app/email.service.ts
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GsapServiceService {
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) { }

  isOnVue(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isOnServ(): boolean {
    return isPlatformServer(this.platformId);
  }
}