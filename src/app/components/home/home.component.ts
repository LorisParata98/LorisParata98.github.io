import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ContactMeComponent } from '../contact-me/contact-me.component';
import { ExperienceSummaryComponent } from '../experience-summary/experience-summary.component';
import { PresentationComponent } from '../presentation/presentation.component';
import { ProjectsPortfolioComponent } from '../projects-portfolio/projects-portfolio.component';
import { TecnologySkillsComponent } from '../tecnology-skills/tecnology-skills.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PresentationComponent,
    ExperienceSummaryComponent,
    ProjectsPortfolioComponent,
    WorkExperiencesComponent,
    TecnologySkillsComponent,
    ContactMeComponent,
    AnimateOnScrollModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
