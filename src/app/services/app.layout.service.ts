import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
export interface MenubarItem {
  title: string;
  icon?: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public isLightTheme = signal<boolean>(true);
  public isMenuOpen = signal<boolean>(false);
  public menuItems = signal<MenubarItem[]>([]);

  constructor(private _router: Router, private _translateService: TranslocoService) {
    const asd = this._translateService.getAvailableLangs();
    console.log(asd);

    this._translateService.langChanges$.subscribe(() => {
      this.menuItems.set([
        { title: this._translateService.translate('menu.home'), id: 'home', icon: 'home' },
        { title: this._translateService.translate('menu.overview'), id: 'overview', icon: 'account-search' },
        { title: this._translateService.translate('menu.projects'), id: 'projects', icon: 'draw' },
        { title: this._translateService.translate('menu.workExperiences'), id: 'work', icon: 'forklift' },
        { title: this._translateService.translate('menu.technicalSkills'), id: 'knowledge', icon: 'bookshelf' },
        { title: this._translateService.translate('menu.contactMe'), id: 'contact', icon: 'phone' },
      ]);
    })
  }

  onMenuToggle() {
    this.isMenuOpen.update((oldValue) => !oldValue);
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  getMenuItems() {
    return this.menuItems();
  }
}
