import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { IosInstallBannerComponent } from './components/ios-install-banner/ios-install-banner.component';
import { PwaInstallPromptComponent } from './components/pwa-install-prompt/pwa-install-prompt.component';
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
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    // Verifica se le notifiche sono già abilitate
    console.log('Permesso check');
    if (Notification.permission === 'granted') {
      console.log('Dentro primo if');
      this.initializeNotifications();
    } else {
      this.enableNotifications();
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
      alert(token);
      this.notificationsEnabled = true;
      this.pushService.listenToMessages();

      // Invia il token al tuo backend
      this.sendTokenToBackend(token);
    }
  }

  private async initializeNotifications(): Promise<void> {
    this.fcmToken = (await this.pushService.getToken()) ?? null;
    this.notificationsEnabled = !!this.fcmToken;
    this.pushService.listenToMessages();
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
