import { Component, effect, input, output, signal } from '@angular/core';
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

  imageLoaded = signal(false);

  constructor() {
    effect(() => {
      this.project();
      this.imageLoaded.set(false);
    });
  }

  onClick() {
    this.select.emit(this.project());
  }

  onImageLoad() {
    this.imageLoaded.set(true);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/projects/default.webp';
    this.imageLoaded.set(true);
  }
}
