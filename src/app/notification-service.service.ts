// notification.service.ts
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private swPush: SwPush) { }

  requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  async showNotification(title: string, options?: NotificationOptions) {
    const permission = await this.requestPermission();

    if (permission === 'granted') {
      if (this.swPush.isEnabled) {
        // Usa il Service Worker
        return this.swPush.messages.subscribe(message => {
          console.log('Messaggio ricevuto:', message);
        });
      } else {
        // Fallback: notifica diretta
        return new Notification(title, options);
      }
    }
    return null;
  }

  simulateNotification() {
    this.showNotification('Notifica di Test', {
      body: 'Questa è una notifica PWA di prova',
      icon: 'assets/icons/icon-192x192.png',
      badge: 'assets/icons/icon-72x72.png',
      tag: 'test-notification',
      requireInteraction: false
    });
  }
}