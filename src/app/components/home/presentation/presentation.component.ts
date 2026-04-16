import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import { switchMap, take } from 'rxjs';
import { GsapServiceService } from '../../../services/gsap.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _animationComplete = false;

  constructor(
    private _gsapService: GsapServiceService,
    private _translateService: TranslocoService,
  ) {
    gsap.registerPlugin(TextPlugin);
  }

  public selectedLanguage = signal<string>('it');

  ngAfterViewInit(): void {
    this._translateService.langChanges$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap((lang) => {
          this.selectedLanguage.set(lang);
          // Aspetta che il file di traduzione sia caricato prima di procedere
          return this._translateService.selectTranslation(lang).pipe(take(1));
        }),
      )
      .subscribe(() => {
        if (this._gsapService.isOnBrowser()) {
          gsap.killTweensOf('#titolo');
          gsap.killTweensOf('#descrizione');
          gsap.killTweensOf('#intestazione');

          if (this._animationComplete) {
            this._applyTranslations();
          } else {
            this._restoreMinHeights();
            this._clearText();
            this._playAnimation();
          }
        }
      });
  }

  private _getTranslations() {
    const t = this._translateService;
    return {
      welcome: t.translate('intro.welcome'),
      presentation: t.translate('intro.presentation'),
      description: t.translate('intro.description'),
      dnd: t.translate('intro.d&d'),
    };
  }

  /** Animazione finita: sostituzione diretta del testo */
  private _applyTranslations() {
    const tr = this._getTranslations();
    const titolo = document.querySelector('#titolo');
    const descrizione = document.querySelector('#descrizione');
    const intestazione = document.querySelector('#intestazione');

    if (titolo) titolo.textContent = 'LRS_DESIGN';
    if (descrizione) descrizione.textContent = tr.description;
    if (intestazione) intestazione.textContent = tr.dnd;
  }

  /** Animazione in corso: svuota e riparte da zero */
  private _clearText() {
    const titolo = document.querySelector('#titolo');
    const descrizione = document.querySelector('#descrizione');
    const intestazione = document.querySelector('#intestazione');

    if (titolo) titolo.innerHTML = '&nbsp;';
    if (descrizione) descrizione.innerHTML = '&nbsp;';
    if (intestazione) intestazione.innerHTML = '&nbsp;';
  }

  private _playAnimation() {
    this._animationComplete = false;
    const tr = this._getTranslations();

    gsap.to('#titolo', {
      duration: 2,
      text: tr.welcome,
      delay: 1,
    });
    gsap.to('#titolo', {
      duration: 5,
      text: tr.presentation,
      delay: 4,
    });
    gsap.to('#titolo', { duration: 2, text: '|', delay: 16 });
    gsap.to('#titolo', {
      duration: 2,
      text: 'LRS_DESIGN',
      delay: 18,
      onComplete: () => {
        this._animationComplete = true;
        this._releaseMinHeights();
      },
    });
    gsap.to('#descrizione', {
      duration: 6,
      text: tr.description,
      delay: 10,
    });
    gsap.to('#intestazione', {
      duration: 2,
      text: tr.dnd,
      delay: 17,
    });
  }

  /** Rimuove i min-height dopo l'animazione per evitare spazi vuoti */
  private _releaseMinHeights() {
    const titolo = document.querySelector<HTMLElement>('.intro-titolo');
    const descrizione = document.querySelector<HTMLElement>('.intro-descrizione');

    if (titolo) titolo.style.minHeight = '0';
    if (descrizione) descrizione.style.minHeight = '0';
  }

  /** Ripristina i min-height prima di riavviare l'animazione */
  private _restoreMinHeights() {
    const titolo = document.querySelector<HTMLElement>('.intro-titolo');
    const descrizione = document.querySelector<HTMLElement>('.intro-descrizione');

    if (titolo) titolo.style.minHeight = '';
    if (descrizione) descrizione.style.minHeight = '';
  }

  changeLanguage(lang: string) {
    this._translateService.setActiveLang(lang);
  }
}
