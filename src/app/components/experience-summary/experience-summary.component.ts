import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CompletationBarComponent } from './completation-bar/completation-bar.component';

@Component({
  selector: 'app-experience-summary',
  standalone: true,
  imports: [CompletationBarComponent, TranslocoPipe],
  templateUrl: './experience-summary.component.html',
  styleUrl: './experience-summary.component.scss',
})
export class ExperienceSummaryComponent {
  public expirenceYears: number;
  constructor() {
    this.expirenceYears = this.calculateExperienceYears();
  }
  calculateExperienceYears(): any {
    const startDate = new Date(2018, 7, 31); // Agosto 1, 2018
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - startDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffInYears);
  }
}
