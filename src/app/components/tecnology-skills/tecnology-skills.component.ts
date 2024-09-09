import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { SkillCardComponent } from './skill-card/skill-card.component';

@Component({
  selector: 'app-tecnology-skills',
  standalone: true,
  imports: [TranslocoModule, SkillCardComponent],
  templateUrl: './tecnology-skills.component.html',
  styleUrl: './tecnology-skills.component.scss',
})
export class TecnologySkillsComponent {
}
