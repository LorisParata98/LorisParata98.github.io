import { Component } from '@angular/core';
import { SkillCardComponent } from './skill-card/skill-card.component';

@Component({
  selector: 'app-tecnology-skills',
  standalone: true,
  imports: [SkillCardComponent],
  templateUrl: './tecnology-skills.component.html',
  styleUrl: './tecnology-skills.component.scss',
})
export class TecnologySkillsComponent {}
