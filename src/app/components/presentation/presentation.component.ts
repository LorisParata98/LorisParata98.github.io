import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import { combineLatest } from 'rxjs';
import { GsapServiceService } from '../../services/gsap.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [TranslocoPipe, CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements AfterViewInit {
  constructor(
    private _gsapService: GsapServiceService,
    private _translateService: TranslocoService
  ) {
    gsap.registerPlugin(TextPlugin);
  }

  public selectedLanguage = signal<string>('it');

  ngAfterViewInit(): void {
    this._translateService.langChanges$.subscribe((res) => {
      this.selectedLanguage.set(res);
    });

    this._translateService.langChanges$.subscribe(() => {
      if (this._gsapService.isOnVue()) {
        gsap.killTweensOf('#titolo');
        gsap.killTweensOf('#descrizione');
        gsap.killTweensOf('#intestazione');

        this._loadPresentation();
      }
    });
  }

  private _loadPresentation() {
    if (
      this._gsapService.isOnVue() &&
      (!gsap.isTweening('#titolo') ||
        !gsap.isTweening('#descrizione') ||
        !gsap.isTweening('#intestazione'))
    ) {
      combineLatest({
        welcome: this._translateService.selectTranslate('intro.welcome'),
        presentation:
          this._translateService.selectTranslate('intro.presentation'),

        description:
          this._translateService.selectTranslate('intro.description'),
        dnd: this._translateService.selectTranslate('intro.d&d'),
      }).subscribe({
        next: (translations: any) => {
          // Quando tutte le traduzioni sono pronte, esegui le animazioni
          gsap.to('#titolo', {
            duration: 2,
            text: translations.welcome,
            delay: 1,
          });
          gsap.to('#titolo', {
            duration: 5,
            text: translations.presentation,
            delay: 4,
          });
          gsap.to('#titolo', { duration: 2, text: '|', delay: 16 });
          gsap.to('#titolo', { duration: 2, text: 'LRS_DESIGN', delay: 18 });
          gsap.to('#descrizione', {
            duration: 6,
            text: translations.description,
            delay: 10,
          });
          gsap.to('#intestazione', {
            duration: 2,
            text: translations.dnd,
            delay: 17,
          });
        },
        error: (ex) => console.log(ex),
      });
    }
  }

  changeLanguage(lang: string) {
    this._translateService.setActiveLang(lang);
  }
}
