import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public headerTitle = signal<string>('LRS_DESIGN');
  public menuItems = signal<any[]>([]);

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    _matIconRegistry.addSvgIconSet(
      _domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );

    this.menuItems.set([
      { title: 'Home', id: 'home', icon: 'home' },
      { title: 'Overview', id: 'overview', icon: 'overview' },
      { title: 'Projects', id: 'projects', icon: 'projects' },
      { title: 'Work Experiences', id: 'work', icon: 'work' },
      { title: 'Knowledge', id: 'knowledge', icon: 'knowledge' },
      { title: 'Contact Me', id: 'contact', icon: 'contact' },
    ]);
  }

  navigateTo(id: string) {
    console.log(id);
  }
}
