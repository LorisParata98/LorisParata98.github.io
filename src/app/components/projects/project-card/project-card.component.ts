import { Component, input, output } from '@angular/core';
import { Project } from '../projects.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input<Project>();
  select = output<Project | undefined>();

  onClick() {
    this.select.emit(this.project());
  }
}
