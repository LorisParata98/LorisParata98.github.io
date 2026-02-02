import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';

/**
 * Servizio per gestire gli aggiornamenti della PWA
 * Rileva quando il service worker ha una nuova versione disponibile
 * e ricarica l'applicazione
 */
@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(private swUpdate: SwUpdate) {
    this.checkForUpdates();
  }

  /**
   * Controlla se sono disponibili aggiornamenti della PWA
   * Se disponibili, ricarica automaticamente l'app
   */
  private checkForUpdates(): void {
    // Verifica periodicamente se ci sono aggiornamenti
    this.swUpdate.versionUpdates
      .pipe(
        // Filtra solo gli aggiornamenti di tipo 'VERSION_READY'
        filter((event) => event.type === 'VERSION_READY'),
      )
      .subscribe(() => {
        console.log('Nuova versione disponibile, ricaricamento in corso...');
        this.promptUserForReload();
      });

    // Controlla aggiornamenti all'avvio
    this.swUpdate.checkForUpdate();
  }

  /**
   * Mostra un prompt all'utente e ricarica l'app se confermato
   * Se non confermato entro 30 secondi, ricarica comunque
   */
  private promptUserForReload(): void {
    this.reloadApp();
    // const userConfirmed = confirm(
    //   'Una nuova versione della PWA è disponibile. Vuoi ricaricare adesso?',
    // );

    // if (userConfirmed) {

    // } else {
    //   // Ricarica comunque dopo 30 secondi
    //   setTimeout(() => {
    //     console.log('Ricaricamento forzato della PWA');
    //     this.reloadApp();
    //   }, 30000); // 30 secondi
    // }
  }

  /**
   * Ricarica l'applicazione
   */
  private reloadApp(): void {
    document.location.reload();
  }

  /**
   * Controlla manualmente per aggiornamenti
   * Utile da esporre tramite UI se necessario
   */
  public checkForUpdateManually(): Promise<boolean> {
    return this.swUpdate.checkForUpdate();
  }
}
