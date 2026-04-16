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

  isOnBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isOnServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}