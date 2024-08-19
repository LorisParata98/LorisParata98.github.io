import { Component } from '@angular/core';
import { ExperienceItemComponent } from './experience-item/experience-item.component';

@Component({
  selector: 'app-work-experiences',
  standalone: true,
  imports: [ExperienceItemComponent],
  templateUrl: './work-experiences.component.html',
  styleUrl: './work-experiences.component.scss',
})
export class WorkExperiencesComponent {}
