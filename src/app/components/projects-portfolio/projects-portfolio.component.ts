import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';


@Component({
  selector: 'app-projects-portfolio',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './projects-portfolio.component.html',
  styleUrl: './projects-portfolio.component.scss',
})
export class ProjectsPortfolioComponent {
  constructor(private _router: Router) {

  }
  public goToProjects() {
    this._router.navigate(['projects'])
  }
}
