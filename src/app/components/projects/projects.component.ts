import { Component, computed, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CarouselComponent } from './carousel/carousel.component';
import { ProjectDrawerComponent } from './project-drawer/project-drawer.component';

export interface Project {
  nome: string;
  descrizione: string;
  tecnologie: string[];
  urlPreview: string;
  anno: number;
  images?: string[];
}

export interface YearSection {
  year: number;
  projects: Project[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslocoPipe, CarouselComponent, ProjectDrawerComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  selectedProject = signal<Project | null>(null);
  readonly allProjects: Project[] = [
    // 2025
    {
      nome: 'Vendor & Workforce management',
      descrizione:
        'Piattaforma enterprise per la gestione del ciclo procurement: registrazione fornitori, creazione progetti T&M e Fixed Price, matching tra profili e posizioni tramite algoritmo AI. Ho guidato il refactoring FE di una codebase legacy di 440k righe, portandola da Angular 11 a 14 (con predisposizione alla 16), riducendo il codice di oltre 20k righe e il tempo di build da 20 a 8 minuti. Migrazione da Material ad Ant Design con gestione dinamica di white-label. Utilizzata da Engineering, Sopra Steria e PWC.',
      tecnologie: ['Angular'],
      urlPreview: 'https://timeflow.it/',
      anno: 2025,
      images: [
        'assets/images/projects/procurement/1.gif',
        'assets/images/projects/procurement/2.gif',
      ],
    },
    {
      nome: 'Marketplace',
      descrizione:
        'Portale pubblico per lo scambio di domanda e offerta tra aziende di consulenza e clienti. Procurement nasce come verticalizzazione enterprise di questa piattaforma.',
      tecnologie: ['Angular'],
      urlPreview: 'https://marketplace.timeflow.it/',
      anno: 2025,
      images: [
        'assets/images/projects/marketplace/1.webp',
        'assets/images/projects/marketplace/2.webp',
        'assets/images/projects/marketplace/3.webp',
      ],
    },
    {
      nome: 'M13 Progetti',
      descrizione:
        'Sito vetrina per lo studio M13, realtà che integra progettazione tecnica, interior design, comunicazione e organizzazione eventi. Progetto freelance in Angular 19 con SSG custom, curato interamente dal design alla realizzazione. Presenta i servizi dello studio e il portfolio dei lavori realizzati.',
      tecnologie: ['Angular', 'Figma'],
      urlPreview: 'https://www.m13progetti.it',
      anno: 2025,
      images: ['assets/images/projects/m13-progetti/1.webp'],
    },
    {
      nome: 'DendeTravel',
      descrizione:
        'Sito web realizzato per una travel designer freelance. Sviluppato su WordPress partendo da un tema base con modifiche custom per adattarlo alle esigenze del progetto.',
      tecnologie: ['Wordpress'],
      urlPreview: 'https://www.dendetravel.it',
      anno: 2025,
      images: ['assets/images/projects/dendetravel/1.webp'],
    },
    {
      nome: 'DMG - Fusion',
      descrizione:
        'App mobile per la manutenzione e ispezione di ascensori su tutto il territorio italiano, con connessione Bluetooth e Wi-Fi Direct alle centraline. Ho curato il design da zero interfacciandomi in autonomia con i clienti, realizzato prototipi in Figma per testare i flussi, e sviluppato parte delle funzionalità in Flutter 3 nel porting da Xamarin. Successivamente ho progettato e sviluppato il gestionale web in Angular 17 per la gestione di edifici, ascensori, personale e chiavi di accesso, facendo da tutor a una junior dev per un anno.',
      tecnologie: ['Flutter', 'Angular', 'Figma'],
      urlPreview: 'https://fusiondashboard.dmg.it/',
      anno: 2024,
      images: [
        'assets/images/projects/dmg-fusion/1.webp',
        'assets/images/projects/dmg-fusion/2.webp',
        'assets/images/projects/dmg-fusion/3.webp',
        'assets/images/projects/dmg-fusion/4.webp',
        'assets/images/projects/dmg-fusion/5.webp',
      ],
    },
    // 2024
    {
      nome: 'FOFI - Portale pubblico',
      descrizione:
        "Portale pubblico dell'Ordine dei Farmacisti Italiani per la consultazione dell'albo professionale. Realizzato in Angular 16 (portato alla 18), completamente accessibile e conforme alle linee guida WCAG 2.2 AA.",
      tecnologie: ['Angular'],
      urlPreview: 'https://www.fofiruf.it/albo-professionale/iscritti',
      anno: 2024,
      images: ['assets/images/projects/portale-pubblico/1.webp'],
    },
    {
      nome: 'FOFI - Gestionale',
      descrizione:
        'Gestionale interno della Federazione degli Ordini dei Farmacisti Italiani per la gestione di personale, società, corsi e iscrizioni. Ho seguito la realizzazione FE per il primo anno su design esterno, poi ho preso in carico anche il design per le nuove funzionalità.',
      tecnologie: ['Angular', 'Figma'],
      urlPreview: 'https://portale.fofiruf.it',
      anno: 2024,
      images: [
        'assets/images/projects/gestionale/1.webp',
        'assets/images/projects/gestionale/2.webp',
      ],
    },
    {
      nome: 'FOFI - Piattaforma tirocini',
      descrizione:
        "Piattaforma per la gestione centralizzata dei tirocinanti delle università italiane, approvata dal CRUI. Ho curato l'intero processo: flussi UX, UI design e implementazione FE.",
      tecnologie: ['Angular', 'Figma'],
      urlPreview: 'https://tirocini.fofiruf.it',
      anno: 2024,
      images: [
        'assets/images/projects/piattaforma-tirocini/1.webp',
        'assets/images/projects/piattaforma-tirocini/2.webp',
      ],
    },
    {
      nome: 'Ehi App',
      descrizione:
        "Startup seguita per quasi 2 anni: un'app mobile per organizzarsi e partecipare a eventi musicali. Ho fatto parte del team di ideazione e ho realizzato la piattaforma web di backoffice con dashboard di monitoraggio, gestione eventi, comunicazioni e contest interni.",
      tecnologie: ['Angular', 'Figma'],
      urlPreview: 'https://www.digithon.it/startups/1816/ehi-app',
      anno: 2024,
      images: ['assets/images/projects/ehi-app/1.webp'],
    },
    // 2023
    {
      nome: 'Poste Cybergame',
      descrizione:
        'Piattaforma gamificata realizzata per Poste Italiane per la sensibilizzazione sulla cybersecurity. Quiz, campionati, classifiche con punteggi e badge, avatar configurabili. Backend in Strapi. Sviluppato in Mind The App.',
      tecnologie: ['Vue'],
      urlPreview: 'https://example.com',
      anno: 2023,
      images: ['assets/images/projects/default.webp'],
    },
    {
      nome: 'Timecloud',
      descrizione:
        "Timesheet aziendale proprietario di Mind The App per la gestione di dipendenti, buste paga e assegnazione su progetti. Ho sviluppato nuove funzionalità, curato i primi redesign e lavorato anche sull'app Flutter.",
      tecnologie: ['Angular', 'Figma'],
      urlPreview: 'https://www.timecloud.it/',
      anno: 2023,
      images: ['assets/images/projects/timecloud/1.webp'],
    },
    {
      nome: 'Cash Your Trash',
      descrizione:
        "Progetto classificato secondo all'Hackathon del Polo Tecnologico di Pordenone. App gamificata per incentivare la pulizia delle spiagge. Ho seguito l'intero flow di progettazione e realizzato mockup e prototipi in Figma.",
      tecnologie: ['Figma'],
      urlPreview: 'https://example.com',
      anno: 2023,
      images: ['assets/images/projects/cash-your-trash/1.webp'],
    },
    {
      nome: 'Fullfact Scraper',
      descrizione:
        'Progetto universitario di Information Retrieval. Scraper in Python per estrarre dataset etichettati dal portale Full Fact, da utilizzare negli esperimenti di crowdsourcing.',
      tecnologie: ['Python'],
      urlPreview: 'https://example.com',
      anno: 2023,
      images: ['assets/images/projects/default.webp'],
    },
    // 2022
    {
      nome: 'Sinfonist',
      descrizione:
        "Piattaforma enterprise per la gestione dei grandi appalti, utilizzata da aziende come Fastweb e Sielte. Architettura modulare con Core, QSM (questionari), Audit (ispezioni), DSM (documenti) e Billing, ciascuno come libreria indipendente su repo separati. Migrato da Angular 8 a 9. Team di 3 FE e 3 BE (C#), il mio primo progetto enterprise, durato 2 anni. Ho curato anche il design di evolutive per l'app mobile.",
      tecnologie: ['Angular', 'Figma'],
      urlPreview:
        'https://sinfonistpa-auth.dbagroup.it/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3FauthzId%3D71337B40D040F6BB14CB6E6B551614957DC62869FC98EAAAED11D9361AD6BC69',
      anno: 2022,
      images: [
        'assets/images/projects/sinfonist/1.webp',
        'assets/images/projects/sinfonist/2.webp',
      ],
    },
    {
      nome: 'Crowd Frame',
      descrizione:
        'Framework per il crowdsourcing di annotazioni web a cui ho contribuito in due tesi. Nella triennale (Angular 8) ho integrato task con gestione del timer. Nella magistrale (Angular 15) ho progettato e realizzato un chatbot per task di crowdsourcing conversazionale, curando styling, flussi UX e analisi delle performance sugli utenti.',
      tecnologie: ['Angular', 'Figma'],
      urlPreview: 'https://github.com/Miccighel/Crowd_Frame',
      anno: 2022,
      images: [
        'assets/images/projects/crowd-frame/1.webp',
        'assets/images/projects/crowd-frame/2.webp',
        'assets/images/projects/crowd-frame/3.webp',
      ],
    },
    // 2021
    {
      nome: 'Gestionali aziendali',
      descrizione:
        'CRM per la gestione di lavori e personale realizzati per Mind The App. Progetti per Hydra, Spurgo CanalJet, Fast&Clean e Amici di Nico, sviluppati in Vue 2 e Vue 3 partendo da una base comune e poi verticalizzati per ogni cliente.',
      tecnologie: ['Vue'],
      urlPreview: 'https://example.com',
      anno: 2021,
      images: ['assets/images/projects/default.webp'],
    },
    {
      nome: 'MyHealthStory',
      descrizione:
        'Prima app mobile progettata da zero e realizzata in Flutter 2 per un progetto universitario. Permette agli utenti di gestire la propria cartella clinica, impostare reminder per appuntamenti e assunzione farmaci.',
      tecnologie: ['Flutter', 'Figma'],
      urlPreview: 'https://example.com',
      anno: 2021,
      images: ['assets/images/projects/myhealthstory/1.webp'],
    },
  ];

  // Tutte le tecnologie uniche
  readonly allTecnologie = [
    ...new Set(this.allProjects.flatMap((p) => p.tecnologie)),
  ].sort();

  // Chips selezionate
  selectedTecnologie = signal<Set<string>>(new Set());

  toggleTecnologia(tech: string) {
    this.selectedTecnologie.update((set) => {
      const next = new Set(set);
      next.has(tech) ? next.delete(tech) : next.add(tech);
      return next;
    });
  }

  isSelected(tech: string) {
    return this.selectedTecnologie().has(tech);
  }

  clearFilters() {
    this.selectedTecnologie.set(new Set());
  }

  public onSelect(project?: Project) {
    this.selectedProject.set(project || null);
  }

  // Progetti filtrati
  filteredProjects = computed(() => {
    const selected = this.selectedTecnologie();
    if (selected.size === 0) return this.allProjects;
    return this.allProjects.filter((p) =>
      p.tecnologie.some((t) => selected.has(t)),
    );
  });

  // Sezioni per anno dai progetti filtrati
  sections = computed<YearSection[]>(() => {
    const years = [...new Set(this.filteredProjects().map((p) => p.anno))].sort(
      (a, b) => b - a,
    );
    return years.map((year) => ({
      year,
      projects: this.filteredProjects().filter((p) => p.anno === year),
    }));
  });
}
