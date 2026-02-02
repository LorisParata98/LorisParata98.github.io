import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private messageSubject = new BehaviorSubject<any>(null);
  public message$: Observable<any> = this.messageSubject.asObservable();
  private notificationCountSubject = new BehaviorSubject<number>(0);
  public notificationCount$: Observable<number> =
    this.notificationCountSubject.asObservable();

  constructor(private messaging: Messaging) {}

  /**
   * Verifica se il dispositivo supporta le notifiche push
   * iOS ha limitazioni: le notifiche funzionano solo in modalità standalone
   */
  isNotificationSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  /**
   * Verifica se siamo su iOS
   */
  isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  async requestPermission(): Promise<string | null | undefined> {
    try {
      // Su iOS, le notifiche sono limitate. Non chiedere il permesso se non in standalone
      if (this.isIOS() && (navigator as any).standalone !== true) {
        alert('iOS: notifiche limitate fuori dalla modalità standalone');
        return null;
      }

      const permission = await Notification.requestPermission();

      if (permission !== 'denied') {
        return await this.getToken();
      } else {
        alert('Permesso notifiche negato');
        return null;
      }
    } catch (error) {
      alert('Errore nella richiesta permessi: ' + error);
      return undefined;
    }
  }

  async getToken(): Promise<string | null | undefined> {
    try {
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
      );
      const token = await getToken(this.messaging, {
        serviceWorkerRegistration: registration,
      });

      if (token) {
        alert('Permesso notifiche concesso');
        console.log('FCM Token:', token);
        // Invia questo token al tuo backend per salvarlo
        return token;
      }
      return null;
    } catch (error) {
      alert('Errore nel recupero del token: ' + error);
      return undefined;
    }
  }

  listenToMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Messaggio ricevuto in foreground:', payload);
      this.messageSubject.next(payload);

      // Mostra notifica anche quando l'app è aperta
      this.showNotification(payload);
    });
  }

  private showNotification(payload: any): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        data: payload.data,
      });

      notification.onclick = (event) => {
        // CALLBACK CUSTOM
        window.focus();
      };

      // Incrementa il conteggio notifiche per la Badge API
      this.incrementNotificationBadge();
    }
  }

  /**
   * Incrementa il badge dell'app (puntino rosso sull'icona)
   * Supportato da iOS in standalone e Android con PWA
   */
  private incrementNotificationBadge(): void {
    if ('setAppBadge' in navigator) {
      const currentBadge = this.notificationCountSubject.value;
      const newBadge = currentBadge + 1;
      (navigator as any).setAppBadge(newBadge);
      this.notificationCountSubject.next(newBadge);
      console.log(`Badge aggiornato: ${newBadge}`);
    }
  }

  /**
   * Resetta il badge dell'app
   */
  clearNotificationBadge(): void {
    if ('clearAppBadge' in navigator) {
      (navigator as any).clearAppBadge();
      this.notificationCountSubject.next(0);
      console.log('Badge resettato');
    }
  }

  /**
   * Ottiene il conteggio corrente delle notifiche
   */
  getNotificationCount(): number {
    return this.notificationCountSubject.value;
  }
}
