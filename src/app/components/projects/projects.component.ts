import { Component, computed, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CarouselComponent } from './carousel/carousel.component';
import { ProjectDrawerComponent } from './project-drawer/project-drawer.component';

export interface Project {
  nome: string;
  descrizione: string;
  tecnologia: string;
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
      nome: 'Procurement',
      descrizione: 'Portale enterprise per la gestione dei fornitori.',
      tecnologia: 'Angular',
      urlPreview: 'https://www.timeflow.it/procurement',
      anno: 2025,
    },
    {
      nome: 'Marketplace',
      descrizione:
        'Portale per lo scambio di domanda e offerta tra aziende di consulenza e clienti.',
      tecnologia: 'Angular',
      urlPreview: 'https://www.timeflow.it/marketplace',
      anno: 2025,
    },
    {
      nome: 'M13 Progetti',
      descrizione:
        'Portale web per far conoscere la realtà imprenditoriale dello studio professionale M13.',
      tecnologia: 'Angular',
      urlPreview: 'https://www.m13progetti.it',
      anno: 2025,
    },
    {
      nome: 'DendeTravel',
      descrizione:
        'Portale web per far conoscere la travel Designer Denise, esploratrice esperta, che ha visitato oltre 30 paesi.',
      tecnologia: 'Wordpress',
      urlPreview: 'https://www.dendetravel.it',
      anno: 2025,
    },
    // 2024
    {
      nome: 'Portale pubblico',
      descrizione:
        "Portale pubblico per la consultazione dell'albo professionale.",
      tecnologia: 'Angular',
      urlPreview: 'https://www.fofiruf.it',
      anno: 2024,
    },
    {
      nome: 'Gestionale',
      descrizione: 'Gestionale interno per la gestione degli iscritti.',
      tecnologia: 'Angular',
      urlPreview: 'https://portale.fofiruf.it',
      anno: 2024,
    },
    {
      nome: 'Piattaforma tirocini',
      descrizione: "Gestione centralizzata di tutti i tirocinanti d'Italia.",
      tecnologia: 'Angular',
      urlPreview: 'https://tirocini.fofiruf.it',
      anno: 2024,
    },
    {
      nome: 'Ehi App',
      descrizione: 'Applicazione per la gestione delle comunicazioni.',
      tecnologia: 'Angular',
      urlPreview: 'https://example.com',
      anno: 2024,
    },
    // 2023
    {
      nome: 'Poste Cybergame',
      descrizione:
        'Gioco interattivo per la sensibilizzazione sulla cybersecurity.',
      tecnologia: 'Angular',
      urlPreview: 'https://example.com',
      anno: 2023,
    },
    {
      nome: 'Timecloud',
      descrizione: 'Gestione del tempo e delle risorse aziendali.',
      tecnologia: 'Angular',
      urlPreview: 'https://example.com',
      anno: 2023,
    },
    {
      nome: 'Cash Your Trash',
      descrizione:
        'Piattaforma per il riciclo e la vendita di materiali usati.',
      tecnologia: 'Project',
      urlPreview: 'https://example.com',
      anno: 2023,
    },
    {
      nome: 'Fullfact Scraper',
      descrizione: 'Scraper per la raccolta di dati di fact-checking.',
      tecnologia: 'Python',
      urlPreview: 'https://example.com',
      anno: 2023,
    },
    // 2022
    {
      nome: 'Sinfonist',
      descrizione:
        'Piattaforma enterprise composta da moduli Core, QSM, Audit e Billing per la gestione aziendale.',
      tecnologia: 'Angular',
      urlPreview: 'https://example.com',
      anno: 2022,
    },
    {
      nome: 'Crowd Frame',
      descrizione: 'Framework per il crowdsourcing di annotazioni.',
      tecnologia: 'Angular',
      urlPreview: 'https://example.com',
      anno: 2022,
    },
    // 2021
    {
      nome: 'Gestionali aziendali',
      descrizione:
        'Applicativi gestionali sviluppati per Hydra, Spurgo CanalJet, Fast&Clean e Amici di Nico.',
      tecnologia: 'Vue',
      urlPreview: 'https://example.com',
      anno: 2021,
    },
    {
      nome: 'MyHealthStory',
      descrizione: 'App per la gestione del percorso sanitario personale.',
      tecnologia: 'Flutter',
      urlPreview: 'https://example.com',
      anno: 2021,
    },
  ];

  // Tutte le tecnologie uniche
  readonly allTecnologie = [
    ...new Set(this.allProjects.map((p) => p.tecnologia)),
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
    return this.allProjects.filter((p) => selected.has(p.tecnologia));
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
