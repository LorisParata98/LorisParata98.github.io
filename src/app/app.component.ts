import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IosInstallBannerComponent } from './components/ios-install-banner/ios-install-banner.component';
import { PwaInstallPromptComponent } from './components/pwa-install-prompt/pwa-install-prompt.component';
import { AppUpdateService } from './services/app-update.service';
import { PushNotificationService } from './services/notification.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    PwaInstallPromptComponent,
    IosInstallBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'LRS_Design';
  notificationsEnabled = false;
  fcmToken: string | null = null;
  lastMessage: any = null;

  constructor(
    private titleService: Title,
    private pushService: PushNotificationService,
    private appUpdateService: AppUpdateService,
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    // Verifica se le notifiche sono supportate e abilitate
    if (!this.pushService.isNotificationSupported()) {
      console.warn('Notifiche non supportate su questo dispositivo');
      return;
    }

    // Su iOS, le notifiche sono disponibili solo in standalone mode
    if (this.pushService.isIOS()) {
      console.log('Dispositivo iOS rilevato - notifiche limitate');
    }

    if (Notification.permission === 'granted') {
      this.initializeNotifications();
    } else if (Notification.permission === 'default') {
      // Chiedi il permesso solo se non è stato ancora chiesto
      this.enableNotifications();
    } else {
      console.log("Permesso notifiche negato dall'utente");
    }

    // Ascolta i messaggi in arrivo
    this.pushService.message$.subscribe((message) => {
      if (message) {
        this.lastMessage = message;
      }
    });
  }

  public scrollToSection(id: string) {
    const targetDiv = document.querySelector(`#${id}`);
    if (targetDiv) {
      const scrollPosition = (targetDiv as any).offsetTop - 540;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }

  async enableNotifications(): Promise<void> {
    const token = await this.pushService.requestPermission();
    console.log('Token ricevuto:', token);
    if (token) {
      this.fcmToken = token;
      this.notificationsEnabled = true;
      this.pushService.listenToMessages();

      // Invia il token al tuo backend
      this.sendTokenToBackend(token);
    }
  }

  private async initializeNotifications(): Promise<void> {
    try {
      this.fcmToken = (await this.pushService.getToken()) ?? null;
      this.notificationsEnabled = !!this.fcmToken;
      if (this.fcmToken) {
        console.log('FCM Token ottenuto, inizializzazione notifiche');
        this.pushService.listenToMessages();
      }
    } catch (error) {
      console.error("Errore nell'inizializzazione notifiche:", error);
    }
  }

  private sendTokenToBackend(token: string): void {
    // Implementa la chiamata al tuo backend
    console.log('Invia questo token al backend:', token);
    // fetch('/api/save-token', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token })
    // });
  }
}
