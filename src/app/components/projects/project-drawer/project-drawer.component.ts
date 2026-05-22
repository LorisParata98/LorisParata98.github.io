import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioMode, PortfolioModeService } from '../../../services/portfolio-mode.service';
import { DrawerContent, Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-drawer',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './project-drawer.component.html',
  styleUrl: './project-drawer.component.scss',
  animations: [
    trigger('imageSlide', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(48px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-48px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class ProjectDrawerComponent {
  project = input<Project | null>(null);
  close = output<void>();

  private modeService = inject(PortfolioModeService);
  mode = toSignal(this.modeService.currentMode$, { initialValue: 'all' as PortfolioMode });

  currentImageIndex = signal(0);
  imageLoaded = signal(false);

  images = computed(() => this.project()?.images ?? []);
  currentImage = computed(() => this.images()[this.currentImageIndex()]);
  hasMultiple = computed(() => this.images().length > 1);

  drawerData = computed<DrawerContent | null>(() => {
    const p = this.project();
    if (!p?.drawerContent) return null;
    const key = this.mode() === 'all' ? 'design' : this.mode();
    return p.drawerContent[key as 'design' | 'dev'];
  });

  modePill = computed(() => {
    const p = this.project();
    if (!p?.pill) return null;
    return p.pill[this.mode()];
  });


  constructor() {
    effect(() => {
      this.project();
      this.currentImageIndex.set(0);
      this.imageLoaded.set(false);
    });
  }

  onImageLoad() {
    this.imageLoaded.set(true);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/projects/default.webp';
    this.imageLoaded.set(true);
  }

  prev() {
    this.imageLoaded.set(false);
    this.currentImageIndex.update((i) =>
      i === 0 ? this.images().length - 1 : i - 1,
    );
  }

  next() {
    this.imageLoaded.set(false);
    this.currentImageIndex.update((i) =>
      i === this.images().length - 1 ? 0 : i + 1,
    );
  }
}
