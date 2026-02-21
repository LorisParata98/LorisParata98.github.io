import { Component } from '@angular/core';

import { TranslocoPipe } from '@jsverse/transloco';
import { CarouselComponent } from './carousel/carousel.component';
export interface Project {
  nome: string;
  descrizione: string;
  tecnologia: string;
  urlPreview: string;
}

export interface ProjectGroup {
  client: string;
  projects: Project[];
}

export interface YearSection {
  year: number;
  groups: ProjectGroup[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslocoPipe, CarouselComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly sections: YearSection[] = [
    {
      year: 2025,
      groups: [
        {
          client: 'Timeflow',
          projects: [
            {
              nome: 'Procurement',
              descrizione: 'Portale enterprise per la gestione dei fornitori.',
              tecnologia: 'Angular 11',
              urlPreview: 'https://www.timeflow.it/procurement',
            },
            {
              nome: 'Marketplace',
              descrizione:
                'Portale per lo scambio di domanda e offerta tra aziende di consulenza e clienti.',
              tecnologia: 'Angular 11',
              urlPreview: 'https://www.timeflow.it/marketplace',
            },
          ],
        },
      ],
    },
    {
      year: 2024,
      groups: [
        {
          client: 'Federazione Ordine dei Farmacisti Italiani',
          projects: [
            {
              nome: 'Portale pubblico',
              descrizione:
                "Portale pubblico per la consultazione dell'albo professionale.",
              tecnologia: 'Angular 16',
              urlPreview: 'https://www.fofiruf.it/albo-professionale/iscritti',
            },
            {
              nome: 'Gestionale',
              descrizione: 'Gestionale interno per la gestione degli iscritti.',
              tecnologia: 'Angular 16',
              urlPreview: 'https://portale.fofiruf.it/login',
            },
            {
              nome: 'Piattaforma tirocini',
              descrizione:
                "Gestione centralizzata di tutti i tirocinanti d'Italia.",
              tecnologia: 'Angular',
              urlPreview: 'https://tirocini.fofiruf.it/login',
            },
          ],
        },
        {
          client: 'DMG',
          projects: [
            {
              nome: 'Fusion App',
              descrizione: 'Applicazione mobile per la gestione aziendale.',
              tecnologia: 'Flutter',
              urlPreview: 'https://example.com/progetto-b',
            },
            {
              nome: 'Fusion Dashboard',
              descrizione: 'Dashboard per il monitoraggio dei dati aziendali.',
              tecnologia: 'Angular 18',
              urlPreview: 'https://example.com/progetto-b',
            },
          ],
        },
        {
          client: 'EhiApp',
          projects: [
            {
              nome: 'Ehi App',
              descrizione: 'Applicazione per la gestione delle comunicazioni.',
              tecnologia: 'Angular 15',
              urlPreview: 'https://example.com/progetto-b',
            },
          ],
        },
      ],
    },
    {
      year: 2023,
      groups: [
        {
          client: '',
          projects: [
            {
              nome: 'Poste Cybergame',
              descrizione:
                'Gioco interattivo per la sensibilizzazione sulla cybersecurity.',
              tecnologia: 'Angular 13',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Timecloud',
              descrizione: 'Gestione del tempo e delle risorse aziendali.',
              tecnologia: 'Angular',
              urlPreview: 'https://example.com/progetto-a',
            },
          ],
        },
        {
          client: 'Progetti universitari',
          projects: [
            {
              nome: 'Cash Your Trash',
              descrizione:
                'Piattaforma per il riciclo e la vendita di materiali usati.',
              tecnologia: 'Project',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Scratch Detector',
              descrizione: 'Rilevamento automatico di graffi su superfici.',
              tecnologia: 'Python',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Fullfact Scraper',
              descrizione: 'Scraper per la raccolta di fact-checking.',
              tecnologia: 'Python',
              urlPreview: 'https://example.com/progetto-a',
            },
          ],
        },
      ],
    },
    {
      year: 2022,
      groups: [
        {
          client: 'Sinfonist',
          projects: [
            {
              nome: 'Core',
              descrizione: 'Modulo core della piattaforma Sinfonist.',
              tecnologia: 'Angular 8/9',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'QSM',
              descrizione: 'Quality & Service Management.',
              tecnologia: 'Angular 8/9',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Audit',
              descrizione: 'Modulo di audit e compliance.',
              tecnologia: 'Angular 8/9',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Billing',
              descrizione: 'Gestione della fatturazione.',
              tecnologia: 'Angular 8/9',
              urlPreview: 'https://example.com/progetto-a',
            },
          ],
        },
        {
          client: 'Progetti universitari',
          projects: [
            {
              nome: 'Crowd Frame',
              descrizione: 'Framework per il crowdsourcing di annotazioni.',
              tecnologia: 'Angular 12',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'ToP City',
              descrizione: 'Simulatore di gestione urbana.',
              tecnologia: 'Project',
              urlPreview: 'https://example.com/progetto-a',
            },
          ],
        },
      ],
    },
    {
      year: 2021,
      groups: [
        {
          client: 'Gestionali Vue.js',
          projects: [
            {
              nome: 'Hydra, integrazione Trouble Tickets',
              descrizione: 'Integrazione sistema trouble tickets.',
              tecnologia: 'Vue 2, Flutter',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Spurgo CanalJet',
              descrizione: 'Gestionale per operazioni di spurgo.',
              tecnologia: 'Vue 2',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Fast&Clean',
              descrizione: 'Gestionale per servizi di pulizia.',
              tecnologia: 'Vue 2',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'Amici di Nico',
              descrizione: 'Piattaforma per la gestione di eventi benefici.',
              tecnologia: 'Vue 2',
              urlPreview: 'https://example.com/progetto-a',
            },
          ],
        },
        {
          client: 'Progetti universitari',
          projects: [
            {
              nome: 'MyHealthStory',
              descrizione:
                'App per la gestione del percorso sanitario personale.',
              tecnologia: 'Flutter',
              urlPreview: 'https://example.com/progetto-a',
            },
            {
              nome: 'ParBrum',
              descrizione: 'Sistema IoT per il monitoraggio ambientale urbano.',
              tecnologia: 'IoT, Angular 10, Python',
              urlPreview: 'https://example.com/progetto-a',
            },
          ],
        },
      ],
    },
  ];
}
