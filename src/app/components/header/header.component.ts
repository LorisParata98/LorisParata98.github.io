import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { LayoutService, MenubarItem } from '../../services/app.layout.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // public headerTitle = signal<string>('LRS_DESIGN');
  public menuItems = signal<MenubarItem[]>([]);
  public activeId = signal<string | undefined>(undefined);

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _translateService: TranslocoService,
    private _layoutService: LayoutService
  ) {
    _matIconRegistry.addSvgIconSet(
      _domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );

    this.menuItems.set(this._layoutService.getMenuItems().map((el) => ({
      ...el,
      title: this._translateService.translate(el.title)
    })));

    this._translateService.langChanges$.subscribe(() => {

      this.menuItems.set(this._layoutService.getMenuItems()
      );
    })
  }

  public isMenuOpen() {
    return this._layoutService.isMenuOpen();
  }

  public onMenuToggle() {
    this._layoutService.onMenuToggle();
  }
  navigateTo(id: string) {
    this.activeId.set(id);

  }
}
