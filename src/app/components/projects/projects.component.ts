import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  title = 'projects';


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
