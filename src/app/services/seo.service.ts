import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://lorisparata98.github.io';
export const SITE_NAME = 'LRS Design';

export interface SeoData {
  /** Titolo della pagina, senza il suffisso del sito */
  title: string;
  description: string;
  /** Path della rotta, es. '' oppure 'projects' */
  path: string;
}

/**
 * Aggiorna title, meta description, Open Graph, Twitter card e canonical
 * a ogni cambio di rotta. I valori statici di fallback stanno in index.html.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly _title = inject(Title);
  private readonly _meta = inject(Meta);
  private readonly _document = inject(DOCUMENT);

  update({ title, description, path }: SeoData): void {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}/${path}`.replace(/\/+$/, '/');

    this._title.setTitle(fullTitle);
    this._meta.updateTag({ name: 'description', content: description });
    this._meta.updateTag({ property: 'og:title', content: fullTitle });
    this._meta.updateTag({ property: 'og:description', content: description });
    this._meta.updateTag({ property: 'og:url', content: url });
    this._meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this._meta.updateTag({ name: 'twitter:description', content: description });
    this._setCanonical(url);
  }

  private _setCanonical(url: string): void {
    const head = this._document.head;
    if (!head) return;

    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this._document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
