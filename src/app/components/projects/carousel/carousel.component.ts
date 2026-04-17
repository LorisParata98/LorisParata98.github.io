import { animate, style, transition, trigger } from '@angular/animations';
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

const SWIPE_THRESHOLD = 50;

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(48px)' }),
        animate(
          '220ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-48px)' }),
        animate(
          '220ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
  ],
})
export class CarouselComponent {
  private bp = inject(BreakpointObserver);

  select = output<Project | undefined>();

  visibleCount = toSignal(
    this.bp.observe(['(max-width: 767px)', '(max-width: 1023px)']).pipe(
      map(({ breakpoints }) => {
        if (breakpoints['(max-width: 767px)']) return 1;
        if (breakpoints['(max-width: 1023px)']) return 2;
        return 4;
      }),
    ),
    { initialValue: 4 },
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

  // --- touch swipe ---
  private touchStartX = 0;

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    const delta = this.touchStartX - e.changedTouches[0].clientX;
    if (delta > SWIPE_THRESHOLD) this.next();
    else if (delta < -SWIPE_THRESHOLD) this.prev();
  }

  // --- mouse drag ---
  private mouseStartX = 0;
  private isDragging = false;

  onMouseDown(e: MouseEvent) {
    this.mouseStartX = e.clientX;
    this.isDragging = true;
  }

  onMouseMove(e: MouseEvent) {
    if (this.isDragging) e.preventDefault();
  }

  onMouseUp(e: MouseEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const delta = this.mouseStartX - e.clientX;
    if (delta > SWIPE_THRESHOLD) this.next();
    else if (delta < -SWIPE_THRESHOLD) this.prev();
  }
}
