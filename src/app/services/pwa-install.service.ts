// src/app/services/pwa-install.service.ts
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaInstallService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private canInstall$ = new BehaviorSubject<boolean>(false);
  private isInstalled$ = new BehaviorSubject<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      this.initializeInstallPrompt();
      this.checkIfInstalled();
    }
  }

  private initializeInstallPrompt(): void {
    fromEvent<BeforeInstallPromptEvent>(
      window,
      'beforeinstallprompt',
    ).subscribe((event) => {
      // Previeni il prompt automatico del browser
      event.preventDefault();
      // Salva l'evento per usarlo dopo
      this.deferredPrompt = event;
      this.canInstall$.next(true);
      console.log('PWA installabile rilevata');
    });

    // Ascolta quando l'app viene installata
    fromEvent(window, 'appinstalled').subscribe(() => {
      console.log('PWA installata con successo');
      this.deferredPrompt = null;
      this.canInstall$.next(false);
      this.isInstalled$.next(true);
    });
  }

  private checkIfInstalled(): void {
    // Verifica se l'app è già in modalità standalone
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)',
    ).matches;
    const isIOSStandalone = (navigator as any).standalone === true;

    this.isInstalled$.next(isStandalone || isIOSStandalone);
  }

  get canInstall(): Observable<boolean> {
    return this.canInstall$.asObservable();
  }

  get isInstalled(): Observable<boolean> {
    return this.isInstalled$.asObservable();
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.warn('Prompt di installazione non disponibile');
      return false;
    }

    // Mostra il prompt di installazione
    await this.deferredPrompt.prompt();

    // Attendi la scelta dell'utente
    const { outcome } = await this.deferredPrompt.userChoice;

    console.log(
      `Utente ha ${outcome === 'accepted' ? 'accettato' : 'rifiutato'} l'installazione`,
    );

    // Reset del prompt
    this.deferredPrompt = null;
    this.canInstall$.next(false);

    return outcome === 'accepted';
  }

  getInstallInstructions(): {
    platform: string;
    instructions: string;
    limitations?: string;
  } {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
      return {
        platform: 'iOS',
        instructions:
          'Tocca il pulsante Condividi e seleziona "Aggiungi a Home"',
        limitations:
          "Su iOS, le notifiche push sono disponibili solo quando l'app è in modalità standalone. Android offre un supporto più completo.",
      };
    } else if (/android/.test(userAgent)) {
      return {
        platform: 'Android',
        instructions:
          'Tocca il menu e seleziona "Aggiungi a schermata Home" o "Installa app"',
      };
    } else {
      return {
        platform: 'Desktop',
        instructions:
          "Cerca l'icona di installazione nella barra degli indirizzi",
      };
    }
  }
}
