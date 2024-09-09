import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CompletationBarComponent } from './completation-bar/completation-bar.component';

@Component({
  selector: 'app-experience-summary',
  standalone: true,
  imports: [CompletationBarComponent, TranslocoModule],
  templateUrl: './experience-summary.component.html',
  styleUrl: './experience-summary.component.scss',
})
export class ExperienceSummaryComponent {
  public onChangeLanguage(lang: string) { }
}
