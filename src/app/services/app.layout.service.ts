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



    this.menuItems.set([
      { title: 'menu.home', id: 'home', icon: 'home' },
      { title: 'menu.overview', id: 'overview', icon: 'account-search' },
      { title: 'menu.projects', id: 'projects', icon: 'draw' },
      { title: 'menu.workExperiences', id: 'work', icon: 'forklift' },
      { title: 'menu.technicalSkills', id: 'knowledge', icon: 'bookshelf' },
      { title: 'menu.contactMe', id: 'contact', icon: 'phone' },
    ]);

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

  getMenuItems(currentRoute?: string) {
    if (currentRoute == '/projects') {
      return [{ title: 'menu.prj1', id: 'prj1', icon: '1' },]
    } else {
      return this.menuItems();
    }
  }
}
