// src/app/components/install-button/install-button.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { PwaInstallService } from '../../services/pwa-install.service';

@Component({
  selector: 'app-install-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    @if ((canInstall$ | async)) {
      <p-button 
        label="Installa App" 
        icon="pi pi-download"
        severity="success"
        (onClick)="install()"
        [raised]="true">
      </p-button>
    }

    @if ((isInstalled$ | async)) {
      <div class="flex items-center gap-2 text-green-600">
        <i class="pi pi-check-circle"></i>
        <span class="font-semibold">App Installata</span>
      </div>
    }
  `
})
export class InstallButtonComponent implements OnInit {
  private pwaInstallService = inject(PwaInstallService);

  canInstall$!: Observable<boolean>;
  isInstalled$!: Observable<boolean>;

  ngOnInit() {
    this.canInstall$ = this.pwaInstallService.canInstall;
    this.isInstalled$ = this.pwaInstallService.isInstalled;
  }

  async install() {
    await this.pwaInstallService.promptInstall();
  }
}