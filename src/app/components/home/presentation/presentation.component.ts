import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements AfterViewInit {
  private readonly _destroyRef = inject(DestroyRef);
  private _typewriterTimeout: ReturnType<typeof setTimeout> | null = null;
  private _phrases: string[] = [];
  private _phraseIdx = 0;
  private _charIdx = 0;
  private _isDeleting = false;

  selectedLanguage = signal('it');
  typewriterText = signal('');

  constructor(private _translateService: TranslocoService) {
    this._destroyRef.onDestroy(() => {
      if (this._typewriterTimeout) clearTimeout(this._typewriterTimeout);
    });
  }

  ngAfterViewInit(): void {
    this._translateService.langChanges$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap((lang) => {
          this.selectedLanguage.set(lang);
          return this._translateService.selectTranslation(lang).pipe(take(1));
        }),
      )
      .subscribe(() => {
        const phrases = this._translateService.translate<string[]>('intro.roles');
        this._startTypewriter(Array.isArray(phrases) ? phrases : []);
      });
  }

  private _startTypewriter(phrases: string[]) {
    if (this._typewriterTimeout) clearTimeout(this._typewriterTimeout);
    this._phrases = phrases;
    this._phraseIdx = 0;
    this._charIdx = 0;
    this._isDeleting = false;
    this.typewriterText.set('');
    this._tick();
  }

  private _tick() {
    const phrase = this._phrases[this._phraseIdx];
    if (!phrase) return;

    if (this._isDeleting) {
      this.typewriterText.set(phrase.substring(0, --this._charIdx));
    } else {
      this.typewriterText.set(phrase.substring(0, ++this._charIdx));
    }

    let delay = this._isDeleting ? 50 : 100;

    if (!this._isDeleting && this._charIdx === phrase.length) {
      delay = 1800;
      this._isDeleting = true;
    } else if (this._isDeleting && this._charIdx === 0) {
      this._isDeleting = false;
      this._phraseIdx = (this._phraseIdx + 1) % this._phrases.length;
      delay = 400;
    }

    this._typewriterTimeout = setTimeout(() => this._tick(), delay);
  }

  changeLanguage(lang: string) {
    this._translateService.setActiveLang(lang);
  }
}
