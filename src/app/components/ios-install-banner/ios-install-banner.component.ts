// src/app/components/ios-install-banner/ios-install-banner.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PwaInstallService } from '../../services/pwa-install.service';

@Component({
  selector: 'app-ios-install-banner',
  standalone: true,
  imports: [CommonModule, MessageModule, ButtonModule],
  template: `
    @if (showBanner) {
      <div
        class="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50"
      >
        <div class="max-w-4xl mx-auto flex items-start gap-3">
          <i class="pi pi-info-circle text-2xl"></i>
          <div class="flex-1">
            <p class="font-semibold mb-1">Installa questa app su iOS</p>
            <p class="text-sm opacity-90">
              Tocca <i class="pi pi-share-alt mx-1"></i> e poi "Aggiungi a Home"
            </p>
          </div>
          <button
            (click)="dismiss()"
            class="text-white opacity-75 hover:opacity-100"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
      </div>
    }
  `,
})
export class IosInstallBannerComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private pwaInstallService = inject(PwaInstallService);

  showBanner = false;

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    this.checkIfShouldShow();
    // }
  }

  private checkIfShouldShow() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = (navigator as any).standalone === true;
    const dismissed = localStorage.getItem('ios-install-dismissed');

    this.showBanner = isIOS && !isStandalone && !dismissed;
  }

  dismiss() {
    this.showBanner = false;
    localStorage.setItem('ios-install-dismissed', 'true');
  }
}
