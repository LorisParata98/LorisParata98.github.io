import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private _router: Router) {
    this.menuItems.set([
      { title: 'Home', id: 'home', icon: 'home' },
      { title: 'Overview', id: 'overview', icon: 'account-search' },
      { title: 'Projects', id: 'projects', icon: 'draw' },
      { title: 'Work Experiences', id: 'work', icon: 'forklift' },
      { title: 'Knowledge', id: 'knowledge', icon: 'bookshelf' },
      { title: 'Contact Me', id: 'contact', icon: 'phone' },
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

  getMenuItems() {
    return this.menuItems();
  }
}
