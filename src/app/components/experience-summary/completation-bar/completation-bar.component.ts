import { Component, input } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-completation-bar',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './completation-bar.component.html',
  styleUrl: './completation-bar.component.scss',
})
export class CompletationBarComponent {
  public title = input<string>();
  public value = input<number>();
}
