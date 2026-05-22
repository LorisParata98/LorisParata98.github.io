import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { Drawer } from 'primeng/drawer';
import { Listbox } from 'primeng/listbox';
import { fadeInUp } from '../../animations';
import { allProjects } from '../../data/projects.data';
import { Project, ProjectTag, YearSection } from '../../models/project.model';
import { PortfolioModeService } from '../../services/portfolio-mode.service';
import { PortfolioToggleComponent } from '../portfolio-toggle/portfolio-toggle.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProjectDrawerComponent } from './project-drawer/project-drawer.component';

export type {
  DrawerContent,
  DrawerStep,
  ProjectVariant,
} from '../../models/project.model';
export type { Project, YearSection };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    TranslocoPipe,
    CarouselComponent,
    ProjectDrawerComponent,
    Drawer,
    Listbox,
    FormsModule,
    PortfolioToggleComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeInUp],
})
export class ProjectsComponent {
  private readonly modeService = inject(PortfolioModeService);
  mode = toSignal(this.modeService.currentMode$, {
    initialValue: 'all' as const,
  });

  showBadge = computed(() => this.mode() !== 'all');
  heroTitleKey = computed(() => `projects.hero.${this.mode()}.titleHtml`);
  heroSubKey = computed(() => `projects.hero.${this.mode()}.sub`);
  badgeKey = computed(() => `toggle.badge.${this.mode()}`);

  selectedProject = signal<Project | null>(null);
  filterSidebarVisible = false;
  listboxFilterValue = '';

  readonly allProjects: Project[] = allProjects;

  selectedTags = signal<Set<string>>(new Set());
  selectedTagsArray = computed(() => Array.from(this.selectedTags()));
  hasFilters = computed(() => this.selectedTags().size > 0);

  allFilterTags = computed<ProjectTag[]>(() => {
    const m = this.mode();
    const tagMap = new Map<string, ProjectTag>();
    for (const p of this.allProjects) {
      const tags = p.variants?.[m]?.tags ?? p.variants?.all?.tags ?? [];
      for (const tag of tags) {
        tagMap.set(tag.label, tag);
      }
    }
    return [...tagMap.values()].sort((a, b) => a.label.localeCompare(b.label));
  });

  constructor() {
    effect(() => {
      this.mode();
      this.selectedTags.set(new Set());
    });
  }

  toggleTag(label: string) {
    this.selectedTags.update((set) => {
      const next = new Set(set);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  isSelected(label: string) {
    return this.selectedTags().has(label);
  }

  clearFilters() {
    this.selectedTags.set(new Set());
    this.listboxFilterValue = '';
  }

  public onSelect(project?: Project) {
    this.selectedProject.set(project || null);
  }

  filteredProjects = computed(() => {
    const selected = this.selectedTags();
    const m = this.mode();
    if (selected.size === 0) return this.allProjects;
    return this.allProjects.filter((p) => {
      const tags = p.variants?.[m]?.tags ?? p.variants?.all?.tags ?? [];
      return tags.some((tag) => selected.has(tag.label));
    });
  });

  sections = computed<YearSection[]>(() => {
    const years = [...new Set(this.filteredProjects().map((p) => p.anno))].sort(
      (a, b) => b - a,
    );
    return years.map((year) => ({
      year,
      projects: this.filteredProjects().filter((p) => p.anno === year),
    }));
  });

  noResults = computed(() => this.sections().length === 0);

  setTagsFromMultiSelect(labels: string[]) {
    this.selectedTags.set(new Set(labels));
  }

  closeDrawer() {
    this.selectedProject.set(null);
  }
}
