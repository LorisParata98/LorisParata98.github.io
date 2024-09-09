import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ExperienceSummaryComponent } from './components/experience-summary/experience-summary.component';
import { HeaderComponent } from './components/header/header.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ProjectsPortfolioComponent } from './components/projects-portfolio/projects-portfolio.component';
import { TecnologySkillsComponent } from './components/tecnology-skills/tecnology-skills.component';
import { WorkExperiencesComponent } from './components/work-experiences/work-experiences.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    PresentationComponent,
    ExperienceSummaryComponent,
    ProjectsPortfolioComponent,
    WorkExperiencesComponent,
    TecnologySkillsComponent,
    ContactMeComponent,
    AnimateOnScrollModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'LRS_Design';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
