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
  public onChangeLanguage(lang: string) { }
}
