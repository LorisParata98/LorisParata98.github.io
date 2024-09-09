import { AfterViewInit, Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import gsap from "gsap";
import { TextPlugin } from 'gsap/all';
import { GsapServiceService } from '../../services/gsap.service';


@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements AfterViewInit {

  constructor(private _gsapService: GsapServiceService, private _translateService: TranslocoService) {
    gsap.registerPlugin(TextPlugin)
  }

  ngAfterViewInit(): void {
    if (this._gsapService.isOnVue()) {
      gsap.to("#titolo", { duration: 2, text: this._translateService.translate('intro.welcome'), delay: 1 });
      gsap.to("#titolo", {
        duration: 3, text: this._translateService.translate('intro.presentation'), delay: 4
      });
      gsap.to("#titolo", { duration: 4, text: this._translateService.translate('intro.presentation2'), delay: 7 });
      gsap.to("#titolo", { duration: 2, text: "|", delay: 11 });

      gsap.to("#titolo", { duration: 2, text: "LRS_DESIGN", delay: 13 });
      gsap.to("#descrizione", {
        duration: 6, text: this._translateService.translate('intro.description'), delay: 15
      });
      gsap.to("#intestazione", { duration: 2, text: this._translateService.translate('intro.d&d'), delay: 18 });
    }

  }


  changeLanguage(lang: string) {
    this._translateService.setActiveLang(lang);
  }
}
