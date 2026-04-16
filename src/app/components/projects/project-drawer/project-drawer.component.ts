import { Component, input, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project } from '../projects.component';

@Component({
  selector: 'app-project-drawer',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './project-drawer.component.html',
  styleUrl: './project-drawer.component.scss',
})
export class ProjectDrawerComponent {
  project = input<Project | null>(null);
  close = output<void>();

  selectedProject = signal<Project | null>(null);
}
