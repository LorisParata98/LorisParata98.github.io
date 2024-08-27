import { Component, signal } from '@angular/core';
import { SkillCardComponent } from './skill-card/skill-card.component';

@Component({
  selector: 'app-tecnology-skills',
  standalone: true,
  imports: [SkillCardComponent],
  templateUrl: './tecnology-skills.component.html',
  styleUrl: './tecnology-skills.component.scss',
})
export class TecnologySkillsComponent {
  public angularDescription = signal<string>(
    'Developed versions: 8/9/13/14/15/16/17/18'
  );

  public vueDescription = signal<string>('Developed versions: 2/3 ');
  public flutterDescription = signal<string>('Developed versions: 2/3');
}
