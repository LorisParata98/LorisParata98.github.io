import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Project } from '../projects.component';
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TagModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  public project = input<Project>()


  public getSeverity(status: string | undefined) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default: return 'info';
    }
  }
}
