import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    PresentationComponent,
    ExperienceSummaryComponent,
    ProjectsPortfolioComponent,
    WorkExperiencesComponent,
    TecnologySkillsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'LRS-Design';
}
