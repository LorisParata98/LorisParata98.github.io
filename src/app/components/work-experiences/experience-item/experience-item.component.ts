import { Component, input } from '@angular/core';
@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
})
export class ExperienceItemComponent {
  public title = input<string>();
  public entity = input<string>();
}
