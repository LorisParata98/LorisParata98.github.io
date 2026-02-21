import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
})
export class ExperienceItemComponent {
  public title = input<string>();
  public entity = input<string>();
  public current = input(false);
}
