import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../projects.component';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  private bp = inject(BreakpointObserver);
  select = output<Project | undefined>();
  visibleCount = toSignal(
    this.bp.observe(['(max-width: 767px)', '(max-width: 1023px)']).pipe(
      map(({ breakpoints }) => {
        if (breakpoints['(max-width: 767px)']) return 1;
        if (breakpoints['(max-width: 1023px)']) return 2;
        return 3;
      }),
    ),
    { initialValue: 3 },
  );

  items = input<Project[]>([]);

  currentIndex = signal(0);

  canPrev = computed(() => this.currentIndex() > 0);
  canNext = computed(
    () => this.currentIndex() + this.visibleCount() < this.items().length,
  );

  visibleItems = computed(() =>
    this.items().slice(
      this.currentIndex(),
      this.currentIndex() + this.visibleCount(),
    ),
  );

  @HostListener('window:resize')
  onResize() {
    // forza il ricalcolo
    this.currentIndex.set(this.currentIndex());
  }

  prev() {
    if (this.canPrev()) this.currentIndex.update((i) => i - 1);
  }

  next() {
    if (this.canNext()) this.currentIndex.update((i) => i + 1);
  }

  public onSelect(project?: Project) {
    if (project) this.select.emit(project);
  }
}
