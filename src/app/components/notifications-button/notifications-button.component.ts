import { Component, signal, WritableSignal } from '@angular/core';
import { PushNotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-button',
  imports: [],
  templateUrl: './notifications-button.component.html',
  styleUrl: './notifications-button.component.scss',
})
export class NotificationsButtonComponent {
  notificationsEnabled = false;
  fcmToken: string | undefined;
  lastMessage: any = null;

  isSupported: boolean = false;
  permission: WritableSignal<NotificationPermission | undefined> =
    signal(undefined);

  constructor(private pushService: PushNotificationService) {}

  ngOnInit(): void {
    this.permission.set(Notification.permission);
    // Verifica se le notifiche sono supportate e abilitate
    this.isSupported = this.pushService.isNotificationSupported();
    if (!this.isSupported) {
      return;
    }

    // Su iOS, le notifiche sono disponibili solo in standalone mode
    if (this.pushService.isIOS()) {
      alert('Dispositivo iOS rilevato - notifiche limitate');
    }
    try {
      if (this.permission() === 'granted') {
        this.initializeNotifications();
      }
    } catch (error) {
      alert('Errore durante la verifica del permesso notifiche: ' + error);
    }

    // Ascolta i messaggi in arrivo
    this.pushService.message$.subscribe((message) => {
      if (message) {
        this.lastMessage = message;
      }
    });
  }

  click() {
    if (this.permission() === 'granted') {
      this.permission.set('granted');
      this.initializeNotifications();
    } else if (this.permission() === 'default') {
      this.permission.set('default');
      // Chiedi il permesso solo se non è stato ancora chiesto
      this.enableNotifications();
    } else {
      this.permission.set('denied');
    }
  }

  async enableNotifications(): Promise<void> {
    this.permission.set(await Notification.requestPermission());
    alert('Permesso notifiche: ' + this.permission());

    if (this.permission() == 'granted') {
      this.fcmToken = await this.pushService.getToken();
      alert('FCM Token ottenuto: ' + this.fcmToken);
      if (this.fcmToken) {
        this.notificationsEnabled = true;
        this.pushService.listenToMessages();
      }
    } else {
      alert('Notifiche non abilitate');
    }
  }

  private async initializeNotifications(): Promise<void> {
    try {
      this.fcmToken = await this.pushService.getToken();
      this.notificationsEnabled = !!this.fcmToken;
      if (this.fcmToken) {
        alert(
          'FCM Token ottenuto, inizializzazione notifiche: ' + this.fcmToken,
        );
        this.pushService.listenToMessages();
      }
    } catch (error) {
      alert("Errore nell'inizializzazione notifiche: " + error);
    }
  }
}
