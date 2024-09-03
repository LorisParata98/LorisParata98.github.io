import { AfterViewInit, Component } from '@angular/core';
import gsap from "gsap";
import { TextPlugin } from 'gsap/all';
import { GsapServiceService } from '../../services/email.service copy';


@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements AfterViewInit {

  constructor(private _gsapService: GsapServiceService) {
    gsap.registerPlugin(TextPlugin)
  }

  ngAfterViewInit(): void {
    if (this._gsapService.isOnVue()) {
      gsap.to("#titolo", { duration: 2, text: "Benvenuto :)", delay: 1 });
      gsap.to("#titolo", { duration: 3, text: "Il mio nome è Loris Parata,", delay: 4 });
      gsap.to("#titolo", { duration: 4, text: "questo sito web ti racconterà un po' di cosa mi occupo", delay: 7 });
      gsap.to("#titolo", { duration: 2, text: "LRS_DESIGN", delay: 12 });
      gsap.to("#descrizione", {
        duration: 4, text: "Sono uno progettista e sviluppatore di applicativi web e mobile che mira a migliorare l’esperienza degli utenti che utilizzano giornalmente i miei prodotti per raggiungere i loro obiettivi.", delay: 15
      });
      gsap.to("#intestazione", { duration: 2, text: "Designer & Developer", delay: 18 });
    }

  }


  public onChangeLanguage(lang: string) { }
}
