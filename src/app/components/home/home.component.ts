import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ExperienceSummaryComponent } from '../experience-summary/experience-summary.component';
import { TecnologySkillsComponent } from '../tecnology-skills/tecnology-skills.component';
import { WorkExperiencesComponent } from '../work-experiences/work-experiences.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ProjectsPortfolioComponent } from './projects-portfolio/projects-portfolio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ExperienceSummaryComponent,
    WorkExperiencesComponent,
    TecnologySkillsComponent,
    ContactMeComponent,
    ProjectsPortfolioComponent,
    AnimateOnScrollModule,
    PresentationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _document = inject(DOCUMENT);
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public scrollToSection(id: string): void {
    if (!this._isBrowser) return;

    const target = this._document.querySelector<HTMLElement>(`#${id}`);
    if (!target) return;

    window.scrollTo({ top: target.offsetTop - 540, behavior: 'smooth' });
  }
}
