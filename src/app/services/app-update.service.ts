import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter, take } from 'rxjs';

const CHECK_INTERVAL_MS = 30 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  readonly updateAvailable = signal<boolean>(false);
  private pendingActivation = false;

  constructor(
    private swUpdate: SwUpdate,
    private router: Router,
  ) {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(filter((event) => event.type === 'VERSION_READY'))
      .subscribe(() => {
        this.updateAvailable.set(true);
        this.pendingActivation = true;
      });

    this.swUpdate.checkForUpdate();
    setInterval(() => this.swUpdate.checkForUpdate(), CHECK_INTERVAL_MS);
  }

  applyUpdate(): void {
    this.swUpdate
      .activateUpdate()
      .catch(() => void 0)
      .finally(() => document.location.reload());
  }

  dismiss(): void {
    this.updateAvailable.set(false);
    if (!this.pendingActivation) return;

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => this.applyUpdate());
  }

  checkForUpdateManually(): Promise<boolean> {
    return this.swUpdate.checkForUpdate();
  }
}
