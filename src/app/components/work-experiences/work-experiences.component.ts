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
export class WorkExperiencesComponent { }
