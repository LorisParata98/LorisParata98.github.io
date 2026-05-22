import { Component, computed, effect, input, output, signal } from '@angular/core';
import { PortfolioMode } from '../../../services/portfolio-mode.service';
import { Project, ProjectVariant } from '../../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input<Project>();
  mode = input<PortfolioMode>('all');
  select = output<Project | undefined>();

  imageLoaded = signal(false);

  variant = computed<ProjectVariant | null>(() => {
    const p = this.project();
    const m = this.mode();
    return p?.variants?.[m] ?? null;
  });

  cardDesc = computed(() => this.variant()?.desc ?? this.project()?.descrizione ?? '');
  cardTags = computed(() => this.variant()?.tags ?? []);

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
