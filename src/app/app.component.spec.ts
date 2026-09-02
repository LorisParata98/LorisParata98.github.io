import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  provideTransloco,
  Translation,
  TranslocoLoader,
} from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';

class StubTranslocoLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return of({});
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNoopAnimations(),
        provideServiceWorker('ngsw-worker.js', { enabled: false }),
        provideTransloco({
          config: { availableLangs: ['it'], defaultLang: 'it' },
          loader: StubTranslocoLoader,
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should toggle the dev mode class on the body', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.body.classList.contains('mode-dev')).toBeFalse();
  });
});
