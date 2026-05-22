import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PortfolioMode = 'all' | 'design' | 'dev';

@Injectable({ providedIn: 'root' })
export class PortfolioModeService {
  private mode$ = new BehaviorSubject<PortfolioMode>('all');
  currentMode$ = this.mode$.asObservable();

  setMode(mode: PortfolioMode): void {
    this.mode$.next(mode);
  }
}
