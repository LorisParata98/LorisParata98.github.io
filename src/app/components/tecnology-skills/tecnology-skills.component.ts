import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { AngularIconComponent } from './icons/angular-icon.component';
import { FlutterIconComponent } from './icons/flutter-icon.component';
import { VueIconComponent } from './icons/vue-icon.component';
import { SkillCardComponent } from './skill-card/skill-card.component';

@Component({
  selector: 'app-tecnology-skills',
  standalone: true,
  imports: [TranslocoPipe, SkillCardComponent, CommonModule],
  templateUrl: './tecnology-skills.component.html',
  styleUrl: './tecnology-skills.component.scss',
})
export class TecnologySkillsComponent {
  readonly skills = [
    {
      titleKey: 'tecnologies.angular',
      descKey: 'tecnologies.angularDesc',
      bgColor: '#DE002D',
      icon: AngularIconComponent,
    },
    {
      titleKey: 'tecnologies.vue',
      descKey: 'tecnologies.vueDesc',
      bgColor: '#42B883',
      icon: VueIconComponent,
    },
    {
      titleKey: 'tecnologies.flutter',
      descKey: 'tecnologies.flutterDesc',
      bgColor: '#00B5F7',
      icon: FlutterIconComponent,
    },
  ];
}
