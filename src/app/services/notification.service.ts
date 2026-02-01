import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {
    private messageSubject = new BehaviorSubject<any>(null);
    public message$: Observable<any> = this.messageSubject.asObservable();

    constructor(private messaging: Messaging) { }

    async requestPermission(): Promise<string | null | undefined> {
        try {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                console.log('Permesso notifiche concesso');
                return await this.getToken();
            } else {
                console.log('Permesso notifiche negato');
                return null;
            }
        } catch (error) {
            return undefined;
        }

    }

    async getToken(): Promise<string | null | undefined> {
        try {
            const token = await getToken(this.messaging);

            if (token) {
                console.log('FCM Token:', token);
                // Invia questo token al tuo backend per salvarlo
                return token;
            }
            return null;
        } catch (error) {
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
                data: payload.data
            });

            notification.onclick = (event) => {

                // CALLBACK CUSTOM
            };
        }
    }
}