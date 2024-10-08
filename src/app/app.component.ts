import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'LRS_Design';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  public scrollToSection(id: string) {
    const targetDiv = document.querySelector(`#${id}`);
    if (targetDiv) {
      const scrollPosition = (targetDiv as any).offsetTop - 540;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }

  }
}
