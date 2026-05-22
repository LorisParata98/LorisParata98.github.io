import { Component, computed, effect, input, output, signal } from '@angular/core';
import { PortfolioMode } from '../../../services/portfolio-mode.service';
import { Project, ProjectTag, ProjectVariant } from '../../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input<Project>();
  mode = input<PortfolioMode>('all');
  activeTags = input<Set<string>>(new Set());
  select = output<Project | undefined>();

  imageLoaded = signal(false);

  variant = computed<ProjectVariant | null>(() => {
    const p = this.project();
    const m = this.mode();
    return p?.variants?.[m] ?? null;
  });

  cardDesc = computed(() => this.variant()?.desc ?? this.project()?.descrizione ?? '');
  cardTags = computed(() => this.variant()?.tags ?? []);

  sortedCardTags = computed(() => {
    const tags = this.cardTags();
    const active = this.activeTags();
    if (active.size === 0) return tags;
    const selected = tags.filter((t) => active.has(t.label));
    const rest = tags.filter((t) => !active.has(t.label));
    return [...selected, ...rest];
  });

  isTagHighlighted(tag: ProjectTag): boolean {
    const active = this.activeTags();
    if (active.size > 0) return active.has(tag.label);
    const m = this.mode();
    return (m === 'dev' && tag.type === 'tech') || (m === 'design' && tag.type === 'design');
  }

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
