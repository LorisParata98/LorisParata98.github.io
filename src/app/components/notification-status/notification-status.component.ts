import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { PushNotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-status',
  standalone: true,
  imports: [CommonModule, MessageModule],
  template: `
    <div class="p-4 space-y-3">
      <!-- Status Notifiche -->
      <div class="space-y-2">
        <div *ngIf="isSupported$ | async; else notSupported">
          <p-message
            severity="info"
            [text]="'Notifiche supportate su questo dispositivo'"
            icon="pi pi-check"
          >
          </p-message>

          <!-- iOS Warning -->
          <div *ngIf="isIOS$ | async" class="mt-2">
            <p-message
              severity="warn"
              [text]="
                'iOS: Le notifiche push sono limitate e disponibili solo in modalità standalone'
              "
              icon="pi pi-exclamation-triangle"
            >
            </p-message>
            <p class="text-sm text-gray-600 mt-2 ml-4">
              📌 Per utilizzare le notifiche su iOS:
              <br />1. Installa l'app tramite "Aggiungi a Home" <br />2. Apri
              l'app in modalità standalone (non nel browser) <br />3. Concedi i
              permessi quando richiesto
            </p>
          </div>

          <!-- Android Info -->
          <div *ngIf="isAndroid$ | async" class="mt-2">
            <p-message
              severity="success"
              [text]="'Android: Supporto completo per le notifiche push'"
              icon="pi pi-check"
            >
            </p-message>
          </div>
        </div>

        <ng-template #notSupported>
          <p-message
            severity="error"
            [text]="'Notifiche non supportate su questo dispositivo'"
            icon="pi pi-times"
          >
          </p-message>
        </ng-template>
      </div>

      <!-- Badge API Status -->
      <div class="space-y-2" *ngIf="badgeSupported$ | async">
        <p-message
          severity="info"
          [text]="'Badge API supportata (icona con numero notifiche)'"
          icon="pi pi-bell"
        >
        </p-message>
        <p class="text-sm text-gray-600 ml-4">
          Conteggio notifiche non lette: {{ notificationCount$ | async }}
        </p>
      </div>

      <!-- Permission Status -->
      <div class="space-y-2">
        <div [ngSwitch]="permissionStatus$ | async">
          <div *ngSwitchCase="'granted'">
            <p-message
              severity="success"
              [text]="'Permessi notifiche: CONCESSI ✓'"
              icon="pi pi-check"
            >
            </p-message>
          </div>
          <div *ngSwitchCase="'denied'">
            <p-message
              severity="error"
              [text]="'Permessi notifiche: NEGATI ✗'"
              icon="pi pi-times"
            >
            </p-message>
          </div>
          <div *ngSwitchDefault>
            <p-message
              severity="warn"
              [text]="'Permessi notifiche: NON ANCORA CONCESSI'"
              icon="pi pi-question"
            >
            </p-message>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      ::ng-deep {
        .p-message {
          width: 100%;
        }
      }
    `,
  ],
})
export class NotificationStatusComponent implements OnInit {
  private pushService = inject(PushNotificationService);

  isSupported$ = this.getIsSupported();
  isIOS$ = this.getIsIOS();
  isAndroid$ = this.getIsAndroid();
  badgeSupported$ = this.getBadgeSupported();
  notificationCount$ = this.pushService.notificationCount$;
  permissionStatus$ = this.getPermissionStatus();

  ngOnInit(): void {
    // Aggiorna lo stato dei permessi
  }

  private getIsSupported() {
    return new Promise<boolean>((resolve) => {
      resolve(this.pushService.isNotificationSupported());
    });
  }

  private getIsIOS() {
    return new Promise<boolean>((resolve) => {
      resolve(this.pushService.isIOS());
    });
  }

  private getIsAndroid() {
    return new Promise<boolean>((resolve) => {
      const isAndroid = /android/i.test(navigator.userAgent);
      resolve(isAndroid);
    });
  }

  private getBadgeSupported() {
    return new Promise<boolean>((resolve) => {
      resolve('setAppBadge' in navigator);
    });
  }

  private getPermissionStatus() {
    return new Promise<string>((resolve) => {
      resolve(Notification.permission);
    });
  }
}
