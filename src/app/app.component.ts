import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UpdatePromptComponent } from './components/update-prompt/update-prompt.component';
import { AppUpdateService } from './services/app-update.service';
import { PortfolioModeService } from './services/portfolio-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UpdatePromptComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _document = inject(DOCUMENT);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _modeService = inject(PortfolioModeService);

  // Istanziato qui per avviare il controllo aggiornamenti del service worker
  private readonly _appUpdateService = inject(AppUpdateService);

  ngOnInit(): void {
    this._modeService.currentMode$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((mode) => {
        this._document.body.classList.toggle('mode-dev', mode === 'dev');
      });
  }

  public scrollToSection(id: string): void {
    if (!this._isBrowser) return;

    const target = this._document.querySelector<HTMLElement>(`#${id}`);
    if (!target) return;

    window.scrollTo({ top: target.offsetTop - 540, behavior: 'smooth' });
  }
}
