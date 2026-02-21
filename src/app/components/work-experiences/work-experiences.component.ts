import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ExperienceItemComponent } from './experience-item/experience-item.component';

@Component({
  selector: 'app-work-experiences',
  standalone: true,
  imports: [TranslocoPipe, ExperienceItemComponent],
  templateUrl: './work-experiences.component.html',
  styleUrl: './work-experiences.component.scss',
})
export class WorkExperiencesComponent {
  // work.component.ts
  readonly workItems = [
    {
      entity: 'work.timeflow',
      title: 'work.seniorDev',
      descriptions: ['work.timeflow1Desc'],
    },
    {
      entity: 'work.mta',
      title: 'work.designAndDev',
      descriptions: ['work.mta1Desc', 'work.mta2Desc'],
    },
    {
      entity: 'work.freelance',
      title: 'work.webCmsTitle',
      descriptions: ['work.webCms1Desc'],
    },
  ];
}
