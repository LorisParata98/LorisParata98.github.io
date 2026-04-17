import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UpdatePromptComponent } from './components/update-prompt/update-prompt.component';
import { AppUpdateService } from './services/app-update.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UpdatePromptComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'LRS_Design';
  private readonly appUpdateService = inject(AppUpdateService);

  constructor(
    private titleService: Title,
    // private pushService: PushNotificationService,
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}

  public scrollToSection(id: string) {
    const targetDiv = document.querySelector(`#${id}`);
    if (targetDiv) {
      const scrollPosition = (targetDiv as any).offsetTop - 540;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
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
