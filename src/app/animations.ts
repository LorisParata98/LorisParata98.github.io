import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(8px)' }),
    animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
