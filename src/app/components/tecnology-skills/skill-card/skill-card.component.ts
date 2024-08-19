import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent {
  public title = input<string>();
  public imageName = input<string>();
  public description = input<string>();
  public bgColor = input<string>();
}
