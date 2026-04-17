import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Project } from '../projects.component';

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

  currentImageIndex = signal(0);

  images = computed(() => this.project()?.images ?? []);
  currentImage = computed(() => this.images()[this.currentImageIndex()]);
  hasMultiple = computed(() => this.images().length > 1);

  constructor() {
    effect(() => {
      this.project();
      this.currentImageIndex.set(0);
    });
  }

  prev() {
    this.currentImageIndex.update((i) =>
      i === 0 ? this.images().length - 1 : i - 1,
    );
  }

  next() {
    this.currentImageIndex.update((i) =>
      i === this.images().length - 1 ? 0 : i + 1,
    );
  }
}
