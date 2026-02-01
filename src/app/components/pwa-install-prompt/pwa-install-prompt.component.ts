// src/app/components/pwa-install-prompt/pwa-install-prompt.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Observable } from 'rxjs';
import { PwaInstallService } from '../../services/pwa-install.service';

@Component({
  selector: 'app-pwa-install-prompt',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    @if ((canInstall$ | async) && !dismissed) {
      <p-dialog 
        header="Installa App" 
        [(visible)]="showDialog"
        [modal]="true"
        [style]="{ width: '90vw', maxWidth: '500px' }"
        [draggable]="false"
        [resizable]="false">
        
        <div class="flex flex-col gap-4 p-4">
          <div class="flex items-center gap-3">
            <i class="pi pi-download text-4xl text-primary"></i>
            <div>
              <h3 class="text-lg font-semibold mb-1">Installa la nostra app</h3>
              <p class="text-sm text-gray-600">
                Accedi rapidamente e ricevi notifiche
              </p>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p class="text-sm text-blue-800">
              ✨ <strong>Vantaggi:</strong>
            </p>
            <ul class="text-sm text-blue-700 mt-2 ml-4 space-y-1">
              <li>📱 Icona sulla home screen</li>
              <li>🔔 Notifiche push</li>
              <li>⚡ Accesso offline</li>
              <li>🚀 Esperienza più veloce</li>
            </ul>
          </div>
        </div>

        <ng-template pTemplate="footer">
          <div class="flex gap-2 justify-end">
            <p-button 
              label="Più tardi" 
              severity="secondary"
              [text]="true"
              (onClick)="dismiss()">
            </p-button>
            <p-button 
              label="Installa" 
              icon="pi pi-download"
              (onClick)="install()">
            </p-button>
          </div>
        </ng-template>
      </p-dialog>
    }

    @if ((isInstalled$ | async)) {
      <div class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <i class="pi pi-check-circle"></i>
        <span>App installata! 🎉</span>
      </div>
    }
  `
})
export class PwaInstallPromptComponent implements OnInit {
  private pwaInstallService = inject(PwaInstallService);

  canInstall$!: Observable<boolean>;
  isInstalled$!: Observable<boolean>;
  showDialog = false;
  dismissed = false;

  ngOnInit() {
    this.canInstall$ = this.pwaInstallService.canInstall;
    this.isInstalled$ = this.pwaInstallService.isInstalled;

    // Mostra il dialog dopo 3 secondi se l'app è installabile
    setTimeout(() => {
      this.canInstall$.subscribe(canInstall => {
        if (canInstall && !this.dismissed) {
          this.showDialog = true;
        }
      });
    }, 3000);
  }

  async install() {
    const installed = await this.pwaInstallService.promptInstall();
    if (installed) {
      this.showDialog = false;
    }
  }

  dismiss() {
    this.showDialog = false;
    this.dismissed = true;
    // Salva in localStorage per non mostrare di nuovo
    localStorage.setItem('pwa-install-dismissed', 'true');
  }
}