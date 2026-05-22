import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioMode, PortfolioModeService } from '../../services/portfolio-mode.service';

@Component({
  selector: 'app-portfolio-toggle',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './portfolio-toggle.component.html',
  styleUrl: './portfolio-toggle.component.scss',
})
export class PortfolioToggleComponent {
  private readonly _modeService = inject(PortfolioModeService);
  public mode = toSignal(this._modeService.currentMode$, { initialValue: 'all' as PortfolioMode });

  public setMode(m: PortfolioMode): void {
    this._modeService.setMode(m);
  }
}
