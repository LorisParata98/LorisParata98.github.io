import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { filter, map, startWith } from 'rxjs';
import { LayoutService, MenubarItem } from '../../services/app.layout.service';
import { PortfolioToggleComponent } from '../portfolio-toggle/portfolio-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, TranslocoPipe, PortfolioToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // public headerTitle = signal<string>('LRS_DESIGN');
  public menuItems = signal<MenubarItem[]>([]);
  public activeId = signal<string | undefined>(undefined);
  public onSelect = output<string>();

  isProjectsPage = toSignal(
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this._router.url.startsWith('/projects')),
      startWith(this._router.url.startsWith('/projects')),
    ),
    { initialValue: this._router.url.startsWith('/projects') },
  );

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _translateService: TranslocoService,
    private _layoutService: LayoutService,
    private _router: Router,
  ) {
    _matIconRegistry.addSvgIconSet(
      _domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'),
    );

    this.menuItems.set(
      this._layoutService.getMenuItems().map((el) => ({
        ...el,
        title: this._translateService.translate(el.title),
      })),
    );

    this._translateService.langChanges$.subscribe(() => {
      this.menuItems.set(this._layoutService.getMenuItems());
    });
  }

  public isMenuOpen() {
    return this._layoutService.isMenuOpen();
  }

  public onMenuToggle() {
    this.menuItems.set(
      this._layoutService.getMenuItems().map((el) => ({
        ...el,
        title: this._translateService.translate(el.title),
      })),
    );

    this._layoutService.onMenuToggle();
  }
  navigateTo(id: string) {
    this._layoutService.onMenuToggle();
    this.activeId.set(id);

    if (id === 'projects') {
      this._router.navigate(['/projects']);
    } else {
      if (this._router.url !== '/') {
        this._router.navigate(['/']).then(() => {
          setTimeout(() => this.onSelect.emit(id), 100);
        });
      } else {
        this.onSelect.emit(id);
      }
    }
  }

  public goToHome() {
    this._router.navigateByUrl('/');
  }
}
