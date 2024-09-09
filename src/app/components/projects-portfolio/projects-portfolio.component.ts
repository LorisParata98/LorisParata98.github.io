import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-projects-portfolio',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './projects-portfolio.component.html',
  styleUrl: './projects-portfolio.component.scss',
})
export class ProjectsPortfolioComponent {
  public goToFigma() {
    // window.open(
    //   'https://www.figma.com/team_invite/redeem/e3lix3UGA4E9epRTO9r8zx',
    //   '_blank'
    // );
  }
}
