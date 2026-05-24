import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioMode, PortfolioModeService } from '../../../services/portfolio-mode.service';
import { DrawerContent, Project, ProjectTag } from '../../../models/project.model';
import { DrawerContentBlockComponent } from './drawer-content-block/drawer-content-block.component';

@Component({
  selector: 'app-project-drawer',
  standalone: true,
  imports: [TranslocoPipe, DrawerContentBlockComponent],
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

  hasRichContent = computed(() => !!this.project()?.drawerContent);

  designDrawerData = computed<DrawerContent | null>(() => this.project()?.drawerContent?.design ?? null);
  devDrawerData = computed<DrawerContent | null>(() => this.project()?.drawerContent?.dev ?? null);

  activeDrawerData = computed<DrawerContent | null>(() => {
    const m = this.mode();
    if (m === 'design') return this.designDrawerData();
    if (m === 'dev') return this.devDrawerData();
    return null;
  });

  variantTags = computed<ProjectTag[]>(() => {
    const p = this.project();
    const m = this.mode();
    return p?.variants?.[m]?.tags ?? p?.variants?.all?.tags ?? [];
  });

  variantDesc = computed<string>(() => {
    const p = this.project();
    const m = this.mode();
    return p?.variants?.[m]?.desc ?? p?.descrizione ?? '';
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
