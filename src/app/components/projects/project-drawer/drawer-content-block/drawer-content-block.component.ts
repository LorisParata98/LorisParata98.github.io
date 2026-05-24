import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { DrawerContent } from '../../../../models/project.model';

@Component({
  selector: 'app-drawer-content-block',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './drawer-content-block.component.html',
})
export class DrawerContentBlockComponent {
  data = input.required<DrawerContent>();
  showUser = input<boolean>(false);
  title = input<string | null>(null);
}
