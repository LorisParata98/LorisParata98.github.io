import { Project } from '../models/project.model';

export const allProjects: Project[] = [
  // 2026
  {
    nome: 'CV Builder',
    descrizione:
      'Editor con preview live, tre template, export PDF e DOCX, import JSON per riutilizzare i dati e traduzione integrata con DeepL per candidature internazionali. Obiettivo: rendere più veloce e meno stressante il processo di candidatura” aggiornare, personalizzare, esportare, tenere tutto pronto. Tutto dal browser: niente account, niente abbonamenti.',
    urlPreview: 'https://cv-builder-rho-eight.vercel.app/',
    anno: 2026,
    images: [
      'assets/images/projects/cv-builder/1.gif',
      'assets/images/projects/cv-builder/1.webp',
      'assets/images/projects/cv-builder/2.webp',
    ],
    type: 'both',
    variants: {
      all: {
        problem: 'Come rendere la candidatura meno stressante',
        desc: 'Editor con preview live, export PDF/DOCX, traduzione DeepL integrata. Dal problema alla soluzione senza account.',
        tags: [
          { label: 'Side Project', type: 'common' },
          { label: 'React', type: 'tech' },
        ],
        type: 'both',
      },
      design: {
        problem: 'Come rendere la candidatura meno stressante',
        desc: "Editor con preview live, export PDF/DOCX e traduzione integrata. Progettato partendo dal pain point dell'utente.",
        tags: [
          { label: 'Side Project', type: 'common' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'Rendering PDF realtime, con styling integrato, importazione in JSON ed export multi formato',
        desc: 'React app con state management locale, integrazione DeepL API e rendering cross-browser senza backend.',
        tags: [{ label: 'React', type: 'tech' }],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          "Il processo di candidatura è frammentato tra troppi strumenti: editor, traduttore, converter PDF. <strong>Obiettivo: un'unica interfaccia che snellisca il flusso per e visualizzi il risultato.</strong>",
        user: 'Figura del mondo IT in job hunting. Pain point principale: ogni candidatura in una lingua diversa richiedeva di rifare il CV da zero.',
        steps: [
          {
            n: '01',
            title: 'Discovery',
            desc: '4 interviste con developer in cerca di lavoro. Pattern comune: il PDF veniva rifatto manualmente per ogni azienda.',
          },
          {
            n: '02',
            title: 'Architettura informativa',
            desc: 'Definizione del flusso editor → preview → export.',
          },
          {
            n: '03',
            title: 'Usability test',
            desc: 'Cambio più significativo: modalità form ridimensionabile',
          },
        ],
        metrics: [
          { value: '82%', label: 'Riduzione tempo adattamento candidatura' },
          { value: '4', label: 'Lingue supportate' },
          { value: '0', label: 'Account richiesti' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Trovare un modo agevole per partire da un template riutilizzabile nel tempo',
        steps: [
          {
            n: '01',
            title: 'Architettura dati',
            desc: 'Modello JSON per separare contenuto da presentazione” abilita export multi-formato senza duplicare la logica.',
          },
          {
            n: '02',
            title: 'Rendering engine',
            desc: 'Valutazione di react-pdf vs html-to-canvas. Scelta: react-pdf per fedeltà del layout.',
          },
          {
            n: '03',
            title: 'Export PDF',
            desc: 'Esportazione del PDF con alta fedeltà riguardo alla preview visualizzata.',
          },
          {
            n: '04',
            title: 'Export DOCX',
            desc: 'Integrazione docx.js con mapping personalizzato degli stili CSS → Open XML. Gestione dei font embedding per PDF.',
          },
        ],
        metrics: [
          { value: '<200ms', label: 'Preview latency' },
          { value: '3', label: 'Format export' },
          { value: '0', label: 'Dipendenze backend' },
        ],
        note: 'Il background da designer ha influenzato la scelta di una struttura che permettesse di vedere in realtime il risultato, invece di fare centinaia di tentativi.',
        highlightTech: ['React'],
      },
    },
  },
  // 2025
  {
    nome: 'Vendor & Workforce management',
    descrizione:
      'Piattaforma enterprise per la gestione del ciclo procurement: registrazione fornitori, creazione progetti T&M e Fixed Price, matching tra profili e posizioni tramite algoritmo AI. Ho guidato il refactoring FE di una codebase legacy di 440k righe, portandola da Angular 11 a 14 (con predisposizione alla 16), riducendo il codice di oltre 20k righe e il tempo di build da 20 a 8 minuti. Migrazione da Material ad Ant Design con gestione dinamica di white-label. Utilizzata da Engineering, Sopra Steria e PWC.',
    urlPreview: 'https://timeflow.it/',
    anno: 2025,
    images: [
      'assets/images/projects/procurement/1.gif',
      'assets/images/projects/procurement/2.gif',
    ],
    type: 'design',
    variants: {
      all: {
        problem: 'Come semplificare i flussi della procurement',
        desc: 'Piattaforma B2B enterprise per gestione centralizzata di fornitori, progetti e risorse.',
        tags: [
          { label: 'Enterprise', type: 'design' },

          { label: 'Angular', type: 'tech' },
        ],
        type: 'design',
      },
      design: {
        problem: 'Come semplificare i flussi della procurement',
        desc: 'Piattaforma B2B enterprise” ricerca, information architecture, prototipazione e test con utenti reali.',
        tags: [
          { label: 'Enterprise', type: 'design' },

          { label: 'Figma', type: 'design' },
        ],
        type: 'design',
      },
      dev: {
        problem:
          'Performance su tabelle con 10k+ righe e stato complesso multi-componente',
        desc: 'Risoluzione virtual scrolling per ridurre le change detection su poche decine di righe alla volta',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'Highcharts', type: 'tech' },
          { label: 'Ant Design', type: 'tech' },
          { label: 'Material', type: 'tech' },
        ],
        type: 'dev',
      },
    },
    drawerContent: {
      design: {
        problem:
          "La gestione di fornitori e risorse in aziende multi-sede era distribuita su fogli Excel e email. <strong>Obiettivo: centralizzare il workflow in un'unica piattaforma senza aumentare la complessità percepita.</strong>",
        user: 'HR manager e responsabili acquisti di aziende con 200+ dipendenti. Utenti abituati a Excel” bassa tolleranza per la complessità.',
        steps: [
          {
            n: '01',
            title: 'Research',
            desc: '6 interviste con HR manager. Insight chiave: il vero problema non era trovare i fornitori, ma tracciare lo stato dei contratti nel tempo.',
          },
          {
            n: '02',
            title: 'Information architecture',
            desc: 'Definire le proprità delle informazioni, per una visualizzazione chiara e immediata.',
          },
          {
            n: '03',
            title: 'Prototipazione',
            desc: 'Wireframe → prototipo Figma → test moderato con 8 utenti.',
          },
        ],
        metrics: [
          { value: '-40%', label: 'Tempo per task' },
          { value: '8', label: 'Utenti intervistati' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Piattaforma B2B con stato complesso: tabelle con migliaia di righe, filtri multipli, export asincrono. <strong>La sfida tecnica principale era la performance su dataset enterprise.</strong>',
        steps: [
          {
            n: '01',
            title: 'Virtual scrolling',
            desc: 'Implementazione di virtual scroll custom per tabelle con 10k+ righe senza dipendenze esterne.',
          },
          {
            n: '02',
            title: 'State management',
            desc: "Architettura RxJS per la sincronizzazione dei filtri tra componenti distanti nell'albero.",
          },
          {
            n: '03',
            title: 'Import asincrono',
            desc: 'Gestione import CV in background con gestione delle code per non bloccare il thread principale.',
          },
        ],
        metrics: [
          { value: '10k+', label: 'Righe in tabella' },
          { value: '<50ms', label: 'Scroll performance' },
          { value: '0', label: 'UI freeze su export' },
        ],
        note: 'La conoscenza del design system ha permesso di implementare i componenti rispettando esattamente le specifiche Figma senza andata-ritorno con il designer.',
        highlightTech: ['Angular', 'RxJS', 'State management'],
      },
    },
  },
  // {
  //   nome: 'Marketplace',
  //   descrizione:
  //     'Portale pubblico per lo scambio di domanda e offerta tra aziende di consulenza e clienti. Procurement nasce come verticalizzazione enterprise di questa piattaforma.',
  //   urlPreview: 'https://marketplace.timeflow.it/',
  //   anno: 2025,
  //   images: [
  //     'assets/images/projects/marketplace/1.webp',
  //     'assets/images/projects/marketplace/2.webp',
  //     'assets/images/projects/marketplace/3.webp',
  //   ],
  //   type: 'dev',
  //   variants: {
  //     all: {
  //       problem:
  //         'Architettura componenti per un marketplace ad alta complessità',
  //       desc: 'Design system e architettura frontend per piattaforma B2C. Gestione stato complessa, performance e accessibilit .',
  //       tags: [
  //         { label: 'Design System', type: 'design' },
  //         { label: 'Angular', type: 'tech' },
  //       ],
  //       type: 'dev',
  //     },
  //     design: {
  //       problem:
  //         'Come ridurre il drop del 67% nel flusso di discovery di un marketplace',
  //       desc: 'Ridisegno del sistema filtri con progressive disclosure. A/B test su 2 varianti, +34% click sul primo risultato.',
  //       tags: [
  //
  //         { label: 'Figma', type: 'design' },
  //         { label: 'Hotjar', type: 'tech' },
  //       ],
  //       type: 'dev',
  //     },
  //     dev: {
  //       problem:
  //         'Design system da zero per 3 team paralleli con requisiti WCAG AA',
  //       desc: 'Token system a 3 livelli, Storybook-first.',
  //       tags: [
  //         { label: 'Design System', type: 'design' },

  //         { label: 'Angular', type: 'tech' },
  //         { label: 'Storybook', type: 'tech' },
  //       ],
  //       type: 'dev',
  //     },
  //   },
  //   drawerContent: {
  //     design: {
  //       problem:
  //         "Il flusso di discovery per una piattaforma marketplace aveva un drop del 67% prima del primo contatto. <strong>Obiettivo: ridisegnare l'esperienza di ricerca e filtraggio mantenendo la complessità dell'offerta.</strong>",
  //       user: 'Acquirenti B2C con bassa alfabetizzazione digitale. Il problema principale: troppi filtri visibili subito, paralisi della scelta.',
  //       steps: [
  //         {
  //           n: '01',
  //           title: 'Analisi funnel',
  //           desc: 'Heatmap e session recording su 200 sessioni. Drop concentrato su un unico step: il momento di applicare il primo filtro.',
  //         },
  //         {
  //           n: '02',
  //           title: 'Progressive disclosure',
  //           desc: 'Ridisegno del sistema filtri con progressive disclosure” solo 3 filtri primari visibili, gli altri su espansione.',
  //         },
  //         {
  //           n: '03',
  //           title: 'A/B test',
  //           desc: 'Test su 2 varianti per 3 settimane. Variante con progressive disclosure: +34% click sul primo risultato.',
  //         },
  //       ],
  //       metrics: [
  //         { value: '+34%', label: 'Click first result' },
  //         { value: '−67%', label: 'Drop al filtro' },
  //         { value: '3 sett.', label: 'Ciclo A/B test' },
  //       ],
  //       highlightTech: [],
  //     },
  //     dev: {
  //       problem:
  //         'Design system da zero per un marketplace con 40+ componenti, 3 team di sviluppo paralleli e requisiti di accessibilità WCAG AA. <strong>La sfida: garantire coerenza senza bloccare la velocità dei team.</strong>',
  //       steps: [
  //         {
  //           n: '01',
  //           title: 'Token system',
  //           desc: 'Design token con 3 livelli: primitivi → semantici → componente. Sincronizzazione Figma → CSS custom properties via Style Dictionary.',
  //         },
  //         {
  //           n: '02',
  //           title: 'Component API',
  //           desc: 'Definizione delle API pubbliche dei componenti con input/output tipizzati. Documentazione Storybook-first.',
  //         },
  //       ],
  //       metrics: [
  //         { value: '40+', label: 'Componenti' },
  //         { value: '100%', label: 'WCAG AA' },
  //         { value: '3', label: 'Team simultanei' },
  //       ],
  //       note: 'Avere background da designer ha cambiato come ho strutturato le API dei componenti: ogni prop riflette una scelta semantica di design, non solo un parametro tecnico.',
  //       highlightTech: ['Style Dictionary', 'Storybook'],
  //     },
  //   },
  // },
  {
    nome: 'M13 Progetti',
    descrizione:
      'Sito vetrina per lo studio M13, realtà che integra progettazione tecnica, interior design, comunicazione e organizzazione eventi. Progetto freelance in Angular 19 con SSG, curato interamente dal design alla realizzazione. Presenta i servizi dello studio e il portfolio dei lavori realizzati.',
    urlPreview: 'https://www.m13progetti.com',
    anno: 2025,
    images: ['assets/images/projects/m13-progetti/1.webp'],
    type: 'both',
    variants: {
      all: {
        problem:
          'Come presentare uno studio multidisciplinare con identità coerente',
        desc: 'Sito vetrina per studio M13: design e sviluppo full-ownership, Angular 19 SSG.',
        tags: [
          { label: 'Web Design', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      design: {
        problem:
          "Come tradurre l'identità di uno studio multidisciplinare in un sito coerente",
        desc: "Identità visiva, layout, tipografia e copywriting curati interamente. Dall'intervista al cliente alla consegna.",
        tags: [
          { label: 'Web Design', type: 'design' },
          { label: 'Brand Identity', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'SSG in Angular 19 senza framework dedicato per performance e SEO',
        desc: 'Angular 19 con prerendering custom, ottimizzazione immagini e deploy Vercel senza backend.',
        tags: [
          { label: 'Angular 19', type: 'tech' },
          { label: 'SSG', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          "M13 integra progettazione tecnica, interior design, eventi e comunicazione. <strong>La sfida: creare un'identità visiva che tenesse insieme discipline così diverse senza sembrare generica.</strong>",
        user: 'Studio di 4 persone senza presenza web. Clienti target: aziende e privati del territorio nord-est.',
        steps: [
          {
            n: '01',
            title: 'Brief e identità',
            desc: "Interviste al team per definire i valori chiave. Il claim dello studio è emerso dallo stesso processo: 'competenza, cura, visione'.",
          },
          {
            n: '02',
            title: 'Moodboard e direzione visiva',
            desc: "3 direzioni presentate al cliente. Scelta unanime per l'approccio minimalista con accenti caldi” riflette la qualità materica del lavoro fisico dello studio.",
          },
          {
            n: '03',
            title: 'Layout e contenuti',
            desc: 'Struttura a sezioni narrative: chi siamo, servizi, portfolio lavori. Copywriting curato direttamente con il team.',
          },
        ],
        metrics: [
          { value: '1', label: 'Settimana al go-live' },
          { value: '4', label: 'Sezioni principali' },
          { value: '100', label: 'Lighthouse score' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'SSG nativo in Angular 19 per un sito statico senza backend” performance Lighthouse al massimo e SEO out-of-the-box. <strong>Obiettivo: deploy senza CMS, aggiornamenti tramite TypeScript.</strong>',
        steps: [
          {
            n: '01',
            title: 'Prerendering',
            desc: 'Configurazione SSG con Angular 19 prerender. Tutti i percorsi generati staticamente al build time.',
          },
          {
            n: '02',
            title: 'Ottimizzazione assets',
            desc: 'Immagini in WebP con lazy loading nativo. Font subset per ridurre il peso del CSS iniziale.',
          },
          {
            n: '03',
            title: 'Deploy pipeline',
            desc: 'Deploy su Vercel con preview branch automatici. Nessun backend” dati in TypeScript direttamente nel bundle.',
          },
        ],
        metrics: [
          { value: '100', label: 'Lighthouse perf' },
          { value: '0', label: 'Dipendenze backend' },
          { value: '<1s', label: 'LCP' },
        ],
        highlightTech: ['Angular 19', 'SSG'],
      },
    },
  },
  {
    nome: 'DendeTravel',
    descrizione:
      'Sito web realizzato per una travel designer freelance. Sviluppato su WordPress partendo da un tema base con modifiche custom per adattarlo alle esigenze del progetto.',
    urlPreview: 'https://www.dendetravel.it',
    anno: 2025,
    images: ['assets/images/projects/dendetravel/1.webp'],
    type: 'dev',
    variants: {
      all: {
        problem: 'Come dare visibilità online a una travel designer freelance',
        desc: 'Sito web WordPress con customizzazione completa del tema. Dal brief alla consegna.',
        tags: [
          { label: 'CMS', type: 'design' },
          { label: 'WordPress', type: 'tech' },
        ],
        type: 'dev',
      },
      design: {
        problem: 'Come comunicare il valore di un servizio di viaggi su misura',
        desc: 'Identità visiva e layout adattati al brand della travel designer. UX orientata alla conversione.',
        tags: [{ label: 'Web Design', type: 'design' }],
        type: 'dev',
      },
      dev: {
        problem:
          'Customizzazione WordPress mantenendo la manutenibilità futura',
        desc: 'Tema base esteso con CSS custom, Gutenberg configurato e ottimizzazioni SEO e performance.',
        tags: [
          { label: 'CMS', type: 'design' },
          { label: 'WordPress', type: 'tech' },
        ],
        type: 'dev',
      },
    },
    drawerContent: {
      design: {
        problem:
          "Una travel designer freelance senza presenza online non riusciva a comunicare la differenza tra il suo servizio e un'agenzia tradizionale. <strong>Obiettivo: trasmettere personalizzazione e cura già dalla prima pagina.</strong>",
        user: 'Clienti privati che cercano viaggi su misura. Pain point: difficoltà a distinguere un servizio premium da uno standard.',
        steps: [
          {
            n: '01',
            title: 'Brief',
            desc: "Definizione del brand positioning con la cliente. Parola chiave: 'su misura'. Ogni scelta visiva doveva comunicarlo.",
          },
          {
            n: '02',
            title: 'Selezione tema',
            desc: 'Valutazione di 5 temi WordPress per flessibilità e performance. Scelta orientata alla facilità di aggiornamento autonomo da parte della cliente.',
          },
          {
            n: '03',
            title: 'Personalizzazione visiva',
            desc: 'Palette colori, tipografia e layout delle sezioni hero adattati al tono del brand. Foto curate con la cliente.',
          },
        ],
        metrics: [
          { value: '3', label: 'Settimane dal brief al live' },
          { value: '5', label: 'Temi valutati' },
          { value: '1', label: 'Ciclo di revisione' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'WordPress customizzato mantenendo la possibilità di aggiornamenti autonomi da parte della cliente. <strong>Nessun page builder pesante” solo CSS custom e configurazione nativa.</strong>',
        steps: [
          {
            n: '01',
            title: 'Setup tema',
            desc: 'Tema base selezionato per performance e manutenibilità. Child theme per isolare le customizzazioni dagli aggiornamenti.',
          },
          {
            n: '02',
            title: 'CSS custom',
            desc: 'Override selettivo degli stili base. Variabili CSS per brand token (colori, font) modificabili centralmente.',
          },
          {
            n: '03',
            title: 'SEO e performance',
            desc: 'Plugin SEO configurato, immagini ottimizzate, cache attivata. Lighthouse score sopra 85 su mobile.',
          },
        ],
        metrics: [
          { value: '0', label: 'Page builder' },
          { value: '1', label: 'Child theme' },
        ],
        highlightTech: ['WordPress'],
      },
    },
  },
  {
    nome: 'DMG - Fusion',
    descrizione:
      'App mobile per la manutenzione e ispezione di ascensori su tutto il territorio italiano, con connessione Bluetooth e Wi-Fi Direct alle centraline. Ho curato il design da zero interfacciandomi in autonomia con i clienti, realizzato prototipi in Figma per testare i flussi, e sviluppato parte delle funzionalità in Flutter 3 nel porting da Xamarin. Successivamente ho progettato e sviluppato il gestionale web in Angular 17 per la gestione di edifici, ascensori, personale e chiavi di accesso.',
    urlPreview: 'https://fusiondashboard.dmg.it/',
    anno: 2024,
    images: [
      'assets/images/projects/dmg-fusion/1.webp',
      'assets/images/projects/dmg-fusion/2.webp',
      'assets/images/projects/dmg-fusion/3.webp',
      'assets/images/projects/dmg-fusion/4.webp',
      'assets/images/projects/dmg-fusion/5.webp',
    ],
    type: 'both',
    variants: {
      all: {
        problem: 'Come digitalizzare le ispezioni di ascensori su campo',
        desc: 'Mobile app Flutter + dashboard Angular per manutenzione elevatori. Design e sviluppo full-ownership su entrambe le piattaforme.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Mobile', type: 'design' },
          { label: 'Flutter', type: 'tech' },
          { label: 'Angular', type: 'tech' },
        ],
        type: 'both',
      },
      design: {
        problem:
          "Come progettare un'app per tecnici su campo con connettività instabile",
        desc: 'UX per tecnici manutenzione: progettazione autonoma con cliente, prototipi Figma, test su campo.',
        tags: [
          { label: 'UX', type: 'design' },
          { label: 'Mobile', type: 'design' },
          { label: 'Figma', type: 'design' },
          { label: 'Prototyping', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'Porting da Xamarin a Flutter 3 con connessione Bluetooth e Wi-Fi Direct',
        desc: 'Flutter 3 mobile + Angular 17 dashboard. Connessione Bluetooth alle centraline, gestione stato offline.',
        tags: [
          { label: 'Mobile', type: 'design' },
          { label: 'Enterprise', type: 'design' },
          { label: 'Flutter 3', type: 'tech' },
          { label: 'Angular 17', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          'I tecnici di manutenzione ascensori compilavano rapporti su carta, poi li riscrivevano a computer. <strong>Obiettivo: app mobile che funzionasse anche in scantinati senza connessione.</strong>',
        user: "Tecnici di manutenzione (40-55 anni, bassa alfabetizzazione digitale). Contesto d'uso: spazi ristretti, mani sporche, poca luce.",
        steps: [
          {
            n: '01',
            title: 'Field research',
            desc: "3 sessioni di osservazione sul campo con tecnici. Insight chiave: l'app doveva essere usabile con un solo pollice.",
          },
          {
            n: '02',
            title: 'Flussi critici',
            desc: 'Mappatura di 8 flussi principali. Riduzione a 3 tap per le azioni più frequenti (avvio ispezione, connessione centralina).',
          },
          {
            n: '03',
            title: 'Prototipazione e test',
            desc: 'Prototipi Figma testati con 5 tecnici. Cambio principale: grandi target touch e feedback visivo esplicito per lo stato della connessione.',
          },
        ],
        metrics: [
          { value: '3', label: 'Tap per ispezione' },
          { value: '5', label: 'Tecnici testati' },
          { value: '−70%', label: 'Tempo compilazione' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Porting da Xamarin a Flutter 3 con gestione connessione Bluetooth e Wi-Fi Direct alle centraline. <strong>La complessità principale: stato ibrido online/offline su app e dashboard sincronizzati.</strong>',
        steps: [
          {
            n: '01',
            title: 'Porting Flutter',
            desc: 'Analisi codebase Xamarin e migrazione progressiva a Flutter 3. Gestione plugin Bluetooth nativi per iOS e Android.',
          },
          {
            n: '02',
            title: 'Connessione centraline',
            desc: 'Implementazione protocollo Wi-Fi Direct per comunicazione locale con le centraline degli ascensori.',
          },
          {
            n: '03',
            title: 'Dashboard Angular 17',
            desc: 'Gestionale web per edifici, ascensori, personale e accessi. Tutoraggio junior dev per un anno.',
          },
        ],
        metrics: [
          { value: '2', label: 'Piattaforme (iOS + Android)' },
          { value: '0', label: 'Dipendenze cloud per ispezione' },
        ],
        note: "Il design dell'app mobile ha direttamente influenzato l'architettura del gestionale web: stessa struttura dati, stesso vocabolario UI” nessuna ambiguità tra le due piattaforme.",
        highlightTech: ['Flutter 3', 'Angular 17', 'Bluetooth', 'Wi-fi direct'],
      },
    },
  },
  // 2024
  {
    nome: 'FOFI - Portale pubblico',
    descrizione:
      "Portale pubblico dell'Ordine dei Farmacisti Italiani per la consultazione dell'albo professionale. Realizzato in Angular 16 (portato alla 18), completamente accessibile e conforme alle linee guida WCAG 2.2 AA.",
    urlPreview: 'https://www.fofiruf.it/albo-professionale/iscritti',
    anno: 2024,
    images: ['assets/images/projects/portale-pubblico/1.webp'],
    type: 'dev',
    variants: {
      all: {
        problem:
          "Portale pubblico accessibile per l'albo professionale dei farmacisti",
        desc: 'Angular 16→18, WCAG 2.2 AA compliant. Ricerca iscritti su base pubblica nazionale.',
        tags: [
          { label: 'Accessibilità', type: 'design' },
          { label: 'Enterprise', type: 'design' },
          { label: 'Angular', type: 'tech' },
        ],
        type: 'dev',
      },
      design: {
        problem:
          'Come garantire accessibilità  WCAG 2.2 AA in un portale istituzionale',
        desc: 'Conformità WCAG 2.2 AA su navigazione, form e ricerca. Test con screen reader reali.',
        tags: [
          { label: 'Accessibilità', type: 'design' },
          { label: 'UX', type: 'design' },
        ],
        type: 'dev',
      },
      dev: {
        problem:
          'Migrazione Angular 16→18 su portale istituzionale in produzione',
        desc: 'Angular upgrade, WCAG 2.2 AA, lazy loading e ottimizzazione query per albo professionale pubblico.',
        tags: [
          { label: 'Accessibilità', type: 'design' },
          { label: 'Angular 18', type: 'tech' },
        ],
        type: 'dev',
      },
    },
    drawerContent: {
      design: {
        problem:
          "Un portale istituzionale pubblico deve essere accessibile a chiunque, inclusi utenti con disabilità visive o motorie. <strong>L'accessibilità non era opzionale: requisito legale per la PA italiana.</strong>",
        user: "Cittadini, professionisti e aziende che cercano farmacisti iscritti all'albo. Utenti diversificati per età e abilità digitale.",
        steps: [
          {
            n: '01',
            title: 'Audit WCAG',
            desc: 'Analisi completa contro WCAG 2.2 AA. 23 issue critiche identificate concentrate su contrasto e label form.',
          },
          {
            n: '02',
            title: 'Fix sistematici',
            desc: 'Correzione del contrasto su palette esistente, implementazione focus trap per modal, ARIA label su tutti i controlli interattivi.',
          },
          {
            n: '03',
            title: 'Test con screen reader',
            desc: 'Test manuali con VoiceOver.',
          },
        ],
        metrics: [{ value: '0', label: 'Violazioni WCAG AA' }],
        highlightTech: [],
      },
      dev: {
        problem:
          'Portare Angular 16 alla versione 18 mantenendo la conformità WCAG e la stabilità di un portale istituzionale in produzione. <strong>Ogni breaking change doveva essere verificato sui componenti di accessibilità.</strong>',
        steps: [
          {
            n: '01',
            title: 'Upgrade Angular',
            desc: 'Migrazione graduata 16→17→18 con test regressione su ogni step. Nessun downtime.',
          },
          {
            n: '02',
            title: 'Accessibilità tecnica',
            desc: 'Implementazione focus management, ARIA roles e skip-nav.',
          },
          {
            n: '03',
            title: 'Performance query',
            desc: "Ottimizzazione delle query sull'albo professionale. Paginazione server-side per gestire gli iscritti su scala nazionale.",
          },
        ],
        metrics: [
          { value: '16→18', label: 'Versione Angular' },
          { value: '0', label: 'Downtime deploy' },
          { value: 'AA', label: 'WCAG compliance' },
        ],
        highlightTech: ['Angular 18'],
      },
    },
  },
  {
    nome: 'FOFI - Gestionale',
    descrizione:
      'Gestionale interno della Federazione degli Ordini dei Farmacisti Italiani per la gestione di personale, società, corsi e iscrizioni. Ho seguito la realizzazione FE per il primo anno su design esterno, poi ho preso in carico anche il design per le nuove funzionalità.',
    urlPreview: 'https://portale.fofiruf.it',
    anno: 2024,
    images: [
      'assets/images/projects/gestionale/1.webp',
      'assets/images/projects/gestionale/2.webp',
    ],
    type: 'both',
    variants: {
      all: {
        problem:
          'Gestionale FOFI: un dominio, decine di funzionalità intrecciate',
        desc: 'Gestionale enterprise: primo anno dev su design esterno, poi ownership design per le nuove funzionalità.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      design: {
        problem:
          'Come progettare evolutive in continuità con un design system ereditato',
        desc: 'Progettazione evolutive del gestionale FOFI: allineamento con design system ereditato, IA e flussi per nuove aree.',
        tags: [
          { label: 'UX', type: 'design' },
          { label: 'Enterprise', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem: 'Frontend Angular con form complessi e tabelle gestionali',
        desc: 'Implementazione FE con state management, form complessi e tabelle di gestione.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'RxJS', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          'Dopo un anno di sviluppo su design esterno, le nuove funzionalità non avevano un designer dedicato. <strong>Obiettivo: progettare in continuità con il sistema esistente senza perdere coerenza.</strong>',
        user: "Operatori FOFI: gestori di ordini provinciali, responsabili corsi ECM, amministrativi. Utenti con alta frequenza d'uso quotidiano.",
        steps: [
          {
            n: '01',
            title: 'Analisi design system',
            desc: 'Audit dei componenti usati nel primo anno di sviluppo. Mappatura dei pattern ricorrenti per creare una guida interna.',
          },
          {
            n: '02',
            title: 'Progettazione evolutive',
            desc: 'Design delle nuove sezioni (corsi, società) in Figma. Revisione settimanale con il team BE per allineamento.',
          },
          {
            n: '03',
            title: 'Validazione',
            desc: 'Test informali con operatori interni FOFI. Aggiustamenti su filtri e flussi di approvazione iscrizioni.',
          },
        ],
        metrics: [
          { value: '2+', label: 'Anni sul progetto' },
          { value: '4', label: 'Aree dominio' },
          { value: '0', label: 'Inconsistenze visive nelle evolutive' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Gestionale FOFI: un dominio, decine di funzionalità intrecciate, <strong>La sfida: mantenere la coerenza tra moduli sviluppati in momenti diversi.</strong>',
        steps: [
          {
            n: '01',
            title: 'Struttura moduli',
            desc: 'Lazy loading per dominio. Ogni modulo con routing, state e componenti autonomi per evitare accoppiamento.',
          },
          {
            n: '02',
            title: 'Form complessi',
            desc: 'Reactive forms con validazione cross-field, template multi-step e salvataggio stato intermedio.',
          },
          {
            n: '03',
            title: 'Tabelle gestionali',
            desc: 'Tabelle con filtri multipli, ordinamento, paginazione server-side e export CSV.',
          },
        ],
        metrics: [
          { value: '10+', label: 'Moduli lazy' },
          { value: '2+', label: 'Anni sviluppo' },
          { value: '1', label: 'Codebase Angular' },
        ],
        highlightTech: ['Angular', 'RxJS'],
      },
    },
  },
  {
    nome: 'FOFI - Piattaforma tirocini',
    descrizione:
      "Piattaforma per la gestione centralizzata dei tirocinanti delle università italiane, approvata dal CRUI. Ho curato l'intero processo: flussi UX, UI design e implementazione FE.",
    urlPreview: 'https://tirocini.fofiruf.it',
    anno: 2024,
    images: [
      'assets/images/projects/piattaforma-tirocini/1.webp',
      'assets/images/projects/piattaforma-tirocini/2.webp',
    ],
    type: 'both',
    variants: {
      all: {
        problem:
          'Centralizzare la gestione tirocini farmaceutici a livello nazionale',
        desc: 'Full ownership: UX, UI design e FE. Approvata dal CRUI per le università italiane.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'UX', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      design: {
        problem:
          '8 ruoli utente, 1 flusso di convalida del tirocinio, approvazione CRUI',
        desc: 'Flussi UX e UI design per piattaforma CRUI. 8 ruoli distinti, azioni personalizzate per ogni profilo.',
        tags: [
          { label: 'UX', type: 'design' },
          { label: 'Enterprise', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'Piattaforma multi-ruolo con gestione delle azioni separate per 8 tipologie di utente',
        desc: 'Angular FE con guards e direttiver per ruolo, form multi-step e approvazione tirocini.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'RxJS', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          "La gestione dei tirocini farmaceutici era frammentata tra ogni ordine provinciale. <strong>Obiettivo: un'unica piattaforma per tirocinanti, tutor universitari e ordini, approvata dal CRUI.</strong>",
        user: '8 tipologie di utente: studenti universitari, tutor aziendali, tutor universitari, ordine, ecc... Ciascuno con permessi e funzioanlità diverse.',
        steps: [
          {
            n: '01',
            title: 'Mappatura ruoli e flussi',
            desc: 'Analisi dei 8 ruoli utente con i referenti FOFI. Definizione del flusso di approvazione del tirocinio con 8 step',
          },
          {
            n: '02',
            title: 'Navigazione e azioni',
            desc: 'Ogni utente vede solo le sue funzionalità. Riduce la complessità percepita del 60%.',
          },
          {
            n: '03',
            title: 'UI e prototipazione',
            desc: 'Design in Figma con componenti condivisi. Prototipo testato con referenti FOFI prima del go-live.',
          },
        ],
        metrics: [
          { value: '8', label: 'Ruoli utente' },
          { value: '10+', label: 'Funzionalità' },
          { value: 'CRUI', label: 'Approvazione' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          "Piattaforma con 8 tipologie di utente. <strong>Ogni ruolo aveva flussi, form e permessi diversi l'architettura essere manutenibile.</strong>",
        steps: [
          {
            n: '01',
            title: 'Architettura multi-ruolo',
            desc: 'Guards Angular per routing basato su ruolo. Lazy loading per ogni area funzionale.',
          },
          {
            n: '02',
            title: 'Form multi-step',
            desc: 'Approvazione tirocini con form multi-step, validazione async e salvataggio bozza.',
          },
          {
            n: '03',
            title: 'Integrazione backend',
            desc: 'API REST per gestione domande, approvazioni e ore. Sincronizzazione ottimistica per ridurre i round-trip.',
          },
        ],
        metrics: [
          { value: '8', label: 'Ruoli con routing separato' },
          { value: '0', label: 'Route non autorizzate' },
          { value: '1', label: 'Codebase Angular' },
        ],
        highlightTech: ['Angular', 'RxJS'],
      },
    },
  },
  {
    nome: 'Ehi App',
    descrizione:
      "Startup seguita per quasi 2 anni: un'app mobile per organizzarsi e partecipare a eventi musicali. Ho fatto parte del team di ideazione e ho realizzato la piattaforma web di backoffice con dashboard di monitoraggio, gestione eventi, comunicazioni e contest interni.",
    urlPreview: 'https://www.digithon.it/startups/1816/ehi-app',
    anno: 2024,
    images: ['assets/images/projects/ehi-app/1.webp'],
    type: 'both',
    variants: {
      all: {
        problem:
          'Backoffice per startup musicale: monitoring, eventi e contest',
        desc: '2 anni in un team startup dal concept al prodotto. Backoffice Angular con dashboard real-time.',
        tags: [
          { label: 'Angular', type: 'tech' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      design: {
        problem:
          'Come progettare un backoffice usabile dal team non-tecnico di una startup',
        desc: 'Dal team di ideazione al design del backoffice. Dashboard monitoring, flussi gestione eventi e contest.',
        tags: [
          { label: 'Product Design', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem: '',
        desc: '',
        tags: [{ label: 'Angular', type: 'tech' }],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          'Una startup musicale cresciuta rapidamente aveva bisogno di un backoffice per gestire eventi, comunicazioni e contest. <strong>Obiettivo: strumento usabile dal team non dai tecnici.</strong>',
        user: 'Team interno startup (4 persone non tecniche). Necessità: creare eventi, mandare notifiche e monitorare i contest senza assistenza.',
        steps: [
          {
            n: '01',
            title: 'Co-design con il team',
            desc: 'Parte del team di ideazione dal primo giorno. Design non separato dallo sviluppo” sprint settimanali con feedback immediato.',
          },
          {
            n: '02',
            title: 'Dashboard monitoraggio',
            desc: 'Progettazione della homepage backoffice: metriche chiave visibili al primo sguardo. Ispirazione da dashboard analytics consumer.',
          },
          {
            n: '03',
            title: 'Flussi operativi',
            desc: 'Creazione eventi, invio comunicazioni e gestione contest: ogni flusso ridotto al minimo numero di step con validazione inline.',
          },
        ],
        metrics: [
          { value: '2', label: 'Anni nel team' },
          { value: '4', label: 'Moduli backoffice' },
          { value: '0', label: 'Ticket di supporto dal team' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Backoffice Angular per startup in rapida crescita requisiti che cambiano ogni sprint. <strong>Architettura flessibile per aggiungere moduli senza riscrivere quello che già funzionava.</strong>',
        steps: [
          {
            n: '01',
            title: 'Architettura modulare',
            desc: 'Feature module per ogni area funzionale (eventi, comunicazioni, contest, monitoring). Shared module per componenti comuni.',
          },
          {
            n: '02',
            title: 'Dashboard real-time',
            desc: 'Integrazione WebSocket per aggiornamenti live delle metriche di partecipazione agli eventi.',
          },
          {
            n: '03',
            title: 'Gestione contest',
            desc: 'Logica frontend per contest a tempo con classifica aggiornata e validazione partecipazioni.',
          },
        ],
        metrics: [
          { value: '4', label: 'Feature module' },
          { value: '2', label: 'Anni di evolutive' },
        ],
        highlightTech: ['Angular', 'RxJS'],
      },
    },
  },
  // 2023
  {
    nome: 'Poste Cybergame',
    descrizione:
      'Piattaforma gamificata realizzata per Poste Italiane per la sensibilizzazione sulla cybersecurity. Quiz, campionati, classifiche con punteggi e badge, avatar configurabili. Backend in Strapi. Sviluppato in Mind The App.',
    urlPreview: '',
    anno: 2023,
    images: ['assets/images/projects/default.webp'],
    type: 'dev',
    variants: {
      all: {
        problem:
          'Piattaforma gamificata per la formazione cybersecurity di Poste Italiane',
        desc: 'Quiz, campionati, classifiche e badge per dipendenti Poste. Frontend Vue + backend Strapi.',
        tags: [
          { label: 'Enterprise', type: 'design' },

          { label: 'Vue', type: 'tech' },
        ],
        type: 'dev',
      },
      design: {
        problem:
          'Come rendere la formazione sulla cybersecurity coinvolgente su scala enterprise',
        desc: 'UX per piattaforma gamificata: flussi quiz, classifiche e avatar configurabili per utenti enterprise.',
        tags: [
          { label: 'Enterprise', type: 'design' },

          { label: 'UX', type: 'design' },
        ],
        type: 'dev',
      },
      dev: {
        problem: 'Classifiche real-time e sistema badge su Vue con CMS Strapi',
        desc: 'Vue + Strapi. Classifiche live, sistema badge e campionati gestibili da CMS senza deploy.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Vue', type: 'tech' },
        ],
        type: 'dev',
      },
    },
    drawerContent: {
      design: {
        problem:
          "La formazione obbligatoria sulla cybersecurity aveva tassi di completamento bassi. <strong>Obiettivo: trasformare contenuti didattici in un'esperienza competitiva per aumentare il coinvolgimento.</strong>",
        user: 'Dipendenti Poste Italiane con profili molto diversi. La gamification doveva funzionare anche per chi non ha familiarità con i videogiochi.',
        steps: [
          {
            n: '01',
            title: 'Sistema di progressione',
            desc: 'Definizione del loop di engagement: quiz → punti → badge → classifica. Ciclo progettato per incoraggiare il ritorno.',
          },
          {
            n: '02',
            title: 'Avatar e identità',
            desc: "Avatar configurabile per dare identità personale sull'esperienza. Riduce il distacco da una piattaforma enterprise anonima.",
          },
          {
            n: '03',
            title: 'Campionati a squadre',
            desc: 'Modalità campionato per stimolare la competizione tra uffici. Classifiche separate per non demotivare i nuovi iscritti.',
          },
        ],
        metrics: [
          { value: '3', label: 'Tipi di challenge' },
          { value: '10+', label: 'Avatar possibili per utente' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Classifiche e badge su scala enterprise con backend Strapi. <strong>Il cliente doveva poter aggiornare quiz e campionati autonomamente.</strong>',
        steps: [
          {
            n: '01',
            title: 'Frontend Vue',
            desc: 'Architettura SPA Vue con Vuex per gestione stato classifiche e progressi utente. Componenti riusabili per quiz e campionati.',
          },
          {
            n: '02',
            title: 'Integrazione Strapi',
            desc: 'CMS Strapi per gestione contenuti quiz, badge e campionati. API REST consumate dal frontend.',
          },
          {
            n: '03',
            title: 'Classifiche real-time',
            desc: 'Polling ottimizzato per aggiornamento classifiche durante i campionati. Logica di calcolo punteggi gestita lato server.',
          },
        ],
        metrics: [
          { value: 'Vue', label: 'Frontend' },
          { value: '0', label: 'Deploy per update contenuti' },
        ],
        highlightTech: ['Vue'],
      },
    },
  },
  {
    nome: 'Timecloud',
    descrizione:
      "Timesheet aziendale proprietario di Mind The App per la gestione di dipendenti, buste paga e assegnazione su progetti. Ho sviluppato nuove funzionalità, curato i primi redesign e lavorato anche sull'app Flutter.",
    urlPreview: 'https://www.timecloud.it/',
    anno: 2023,
    images: ['assets/images/projects/timecloud/1.webp'],
    type: 'both',
    variants: {
      all: {
        problem:
          'Timesheet proprietario: redesign, nuove feature e app Flutter in parallelo',
        desc: 'Contributo a prodotto esistente: nuove feature, primi redesign e sviluppo app Flutter.',
        tags: [
          { label: 'SaaS', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'Flutter', type: 'tech' },
        ],
        type: 'both',
      },
      design: {
        problem:
          'Come portare coerenza a un prodotto SaaS cresciuto per accumulazione',
        desc: 'Primo redesign del timesheet Mind The App. Audit visivo, nuovi pattern UI e allineamento design system.',
        tags: [{ label: 'Figma', type: 'design' }],
        type: 'both',
      },
      dev: {
        problem:
          'Feature development su codebase Angular consolidata + contributi app Flutter',
        desc: 'Feature Angular su timesheet esistente + contributi app Flutter per la stessa piattaforma.',
        tags: [
          { label: 'Mobile', type: 'design' },
          { label: 'Angular', type: 'tech' },
          { label: 'Flutter', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          'Un prodotto SaaS cresciuto per 3 anni per accumulazione aveva inconsistenze visive tra sezioni vecchie e nuove. <strong>Obiettivo: primo redesign sistematico senza bloccare lo sviluppo continuo.</strong>',
        user: "HR manager e dipendenti di PMI italiane. Utenti abituali con alta frequenza d'uso le modifiche visive dovevano essere evolutive, non disruptive.",
        steps: [
          {
            n: '01',
            title: 'Audit visivo',
            desc: 'Mappatura delle inconsistenze tra le sezioni del prodotto. 15+ pattern divergenti identificati su spacing, colori e tipografia.',
          },
          {
            n: '02',
            title: 'Redesign progressivo',
            desc: 'Approccio sezione per sezione: nessun big bang. Prima area: dashboard principale e timesheet settimanale.',
          },
          {
            n: '03',
            title: 'Design system embrionale',
            desc: 'Definizione dei token base (colori, spacing, tipografia) per allineare le nuove sezioni. Documentazione Figma condivisa col team.',
          },
        ],
        metrics: [
          { value: '15+', label: 'Pattern inconsistenti risolti' },
          { value: '0', label: 'Funzionalità interrotte' },
          { value: '1', label: 'Design system embrionale' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          "Feature development su codebase Angular consolidata in parallelo con contributi all'app Flutter della stessa piattaforma. <strong>Due codebase diverse, stesso prodotto allineamento costante tra le implementazioni.</strong>",
        steps: [
          {
            n: '01',
            title: 'Feature Angular',
            desc: 'Sviluppo nuove funzionalità su timesheet (gestione straordinari, aggiunta smart working, filtri avanzati). Rispetto delle convenzioni esistenti.',
          },
          {
            n: '02',
            title: 'App Flutter',
            desc: "Contributi all'app mobile Flutter: nuove schermate e sincronizzazione con le API del backend.",
          },
          {
            n: '03',
            title: 'Allineamento prodotto',
            desc: 'Review incrociata tra le due piattaforme per garantire parity delle funzionalità principali.',
          },
        ],
        metrics: [
          { value: '2', label: 'Piattaforme (web + mobile)' },
          { value: 'Flutter', label: 'App mobile' },
          { value: '1', label: 'Backend condiviso' },
        ],
        highlightTech: ['Angular', 'Flutter'],
      },
    },
  },
  {
    nome: 'Cash Your Trash',
    descrizione:
      "Progetto classificato secondo all'Hackathon del Polo Tecnologico di Pordenone. App gamificata per incentivare la pulizia delle spiagge. Ho seguito l'intero flow di progettazione e realizzato mockup e prototipi in Figma.",
    urlPreview: '',
    anno: 2023,
    images: ['assets/images/projects/cash-your-trash/1.webp'],
    type: 'design',
    variants: {
      all: {
        problem:
          'Come incentivare la pulizia delle spiagge con un loop comportamentale',
        desc: 'App gamificata, 2° posto hackathon. Progettazione completa del flusso e prototipo Figma in 24h.',
        tags: [
          { label: 'UX', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'design',
      },
      design: {
        problem:
          'Trasformare la pulizia delle spiagge in esperienza sociale e competitiva in 24h',
        desc: 'Concept, flussi UX e prototipo Figma in 24 ore. Premio 2° classificato al Polo Tecnologico di Pordenone.',
        tags: [
          { label: 'UX', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'design',
      },
      dev: {
        problem:
          "Prototipo ad alta fedeltà per pitch finale” priorità al flusso, non all'implementazione",
        desc: 'Figma prototype per app gamificata di raccolta rifiuti. Interazioni simulate per pitch finale.',
        tags: [],
        type: 'design',
      },
    },
    drawerContent: {
      design: {
        problem:
          "Come convincere le persone a raccogliere rifiuti in spiaggia in modo spontaneo, senza obblighi. <strong>La sfida: progettare un loop comportamentale che trasformasse un'azione scomoda in un'abitudine piacevole.</strong>",
        user: 'Frequentatori di spiagge 18-35 anni. Consapevoli del problema ambientale ma con bassa intenzione di azione. Motivazione sociale > motivazione civica.',
        steps: [
          {
            n: '01',
            title: 'Problem framing (2h)',
            desc: 'Sprint di definizione del problema con il team. Insight: le persone agiscono di più quando vedono che altri lo fanno.',
          },
          {
            n: '02',
            title: 'Concept e meccaniche',
            desc: 'Loop gamification: raccolta → scan QR → punti → classifica locale. Partnership con negozi locali per ricompense reali.',
          },
          {
            n: '03',
            title: 'Prototipo Figma',
            desc: 'Prototipo ad alta fedeltà in 20h. Flusso completo: onboarding, raccolta, rewards e classifica. Presentato al panel di giuria.',
          },
        ],
        metrics: [
          { value: '2°', label: 'Posto hackathon' },
          { value: '24h', label: 'Dal brief al pitch' },
          { value: '4', label: 'Persone nel team' },
        ],
        highlightTech: ['Figma'],
      },
      dev: {
        problem:
          "In un hackathon di 24h la scelta giusta è il prototipo, non l'implementazione. <strong>Obiettivo: prototipo Figma abbastanza credibile da convincere la giuria.</strong>",
        steps: [
          {
            n: '01',
            title: 'Flusso critico',
            desc: 'Identificazione dei 3 flussi da animare nel prototipo: onboarding, scan rifiuto, visualizzazione punti.',
          },
          {
            n: '02',
            title: 'Interazioni Figma',
            desc: "Prototipo con transizioni realistiche e micro-interazioni per simulare il feedback dell'app.",
          },
          {
            n: '03',
            title: 'Pitch finale',
            desc: 'Demo live del prototipo durante la presentazione. Nessun bug visibile grazie al flusso lineare.',
          },
        ],
        metrics: [
          { value: '3', label: 'Flussi prototipati' },
          { value: '24h', label: 'Tempo totale' },
          { value: '2°', label: 'Classificato' },
        ],
        highlightTech: ['Figma'],
      },
    },
  },
  {
    nome: 'Fullfact Scraper',
    descrizione:
      'Progetto universitario di Information Retrieval. Scraper in Python per estrarre dataset etichettati dal portale Full Fact, da utilizzare negli esperimenti di crowdsourcing.',
    urlPreview: '',
    anno: 2023,
    images: ['assets/images/projects/default.webp'],
    type: 'dev',
    variants: {
      all: {
        problem:
          'Dataset etichettato da Full Fact per esperimenti di crowdsourcing IR',
        desc: 'Scraper Python per IR universitario. Estrazione e labeling automatico di claim verificati.',
        tags: [
          { label: 'Università', type: 'design' },
          { label: 'Python', type: 'tech' },
        ],
        type: 'dev',
      },
      design: {
        problem:
          'Schema dati per claim fact-checked compatibile con Crowd Frame',
        desc: 'Struttura dati per claim fact-checked: schema pensato per task di crowdsourcing conversazionale.',
        tags: [
          { label: 'Data Design', type: 'design' },
          { label: 'Python', type: 'tech' },
        ],
        type: 'dev',
      },
      dev: {
        problem:
          'Scraper affidabile e riproducibile per dataset di ricerca universitaria',
        desc: 'Scraper Python con parsing strutturato, deduplicazione e export CSV/JSON per esperimenti IR.',
        tags: [
          { label: 'BeautifulSoup', type: 'tech' },
          { label: 'Python', type: 'tech' },
        ],
        type: 'dev',
      },
    },
    drawerContent: {
      design: {
        problem:
          'Il crowdsourcing di annotazioni richiede dataset ben strutturati con label chiare. <strong>La fase di design dei dati era critica quanto lo scraping: un campo mal modellato avrebbe invalidato gli esperimenti.</strong>',
        user: 'Ricercatori universitari. Il dataset doveva essere riusabile per più tipologie di esperimento di crowdsourcing.',
        steps: [
          {
            n: '01',
            title: 'Analisi portale Full Fact',
            desc: 'Esplorazione manuale della struttura HTML di Full Fact. Identificazione di 5 campi chiave: claim, verdict, category, source, date.',
          },
          {
            n: '02',
            title: 'Schema dati',
            desc: 'Progettazione dello schema CSV/JSON per compatibilità con Crowd Frame, il framework di crowdsourcing del laboratorio.',
          },
          {
            n: '03',
            title: 'Validazione',
            desc: 'Test su 100 record estratti. Controllo manuale della qualità delle label e della completezza dei campi.',
          },
        ],
        metrics: [
          { value: '5', label: 'Campi per record' },
          { value: '100%', label: 'Copertura label' },
          { value: '2', label: 'Format export (CSV/JSON)' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Scraper affidabile per un portale con struttura HTML non documentata, in un contesto di ricerca dove la riproducibilità è critica. <strong>Ogni run doveva produrre lo stesso risultato.</strong>',
        steps: [
          {
            n: '01',
            title: 'Scraping',
            desc: 'Scraper Python con BeautifulSoup per parsing HTML. Gestione dei redirect e delle pagine con struttura variabile.',
          },
          {
            n: '02',
            title: 'Pulizia e deduplicazione',
            desc: 'Pipeline Pandas per normalizzare i dati estratti e rimuovere duplicati. Hash sul testo del claim per deduplicazione affidabile.',
          },
          {
            n: '03',
            title: 'Export',
            desc: 'Export in CSV e JSON compatibili con Crowd Frame. Logging delle run per tracciabilità.',
          },
        ],
        metrics: [
          { value: '0', label: 'Duplicati nel dataset' },
          { value: '2', label: 'Format export' },
          { value: '100%', label: 'Riproducibilità run' },
        ],
        highlightTech: ['Python', 'BeautifulSoup', 'Pandas'],
      },
    },
  },
  // 2022
  {
    nome: 'Sinfonist',
    descrizione:
      "Piattaforma enterprise per la gestione dei grandi appalti, utilizzata da aziende come Fastweb e Sielte. Architettura modulare con Core, QSM (questionari), Audit (ispezioni), DSM (documenti) e Billing, ciascuno come libreria indipendente su repo separati. Migrato da Angular 8 a 9. Team di 3 FE e 3 BE (C#), il mio primo progetto enterprise, durato 2 anni. Ho curato anche il design di evolutive per l'app mobile.",
    urlPreview:
      'https://sinfonistpa-auth.dbagroup.it/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3FauthzId%3D71337B40D040F6BB14CB6E6B551614957DC62869FC98EAAAED11D9361AD6BC69',
    anno: 2022,
    images: [
      'assets/images/projects/sinfonist/1.webp',
      'assets/images/projects/sinfonist/2.webp',
    ],
    type: 'both',
    variants: {
      all: {
        problem:
          '5 librerie Angular per la gestione di grandi appalti su Fastweb e Sielte',
        desc: 'Primo progetto enterprise. Architettura modulare Angular con 5 librerie indipendenti. 2 anni, team 6.',
        tags: [
          { label: 'Enterprise', type: 'design' },

          { label: 'Angular', type: 'tech' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      design: {
        problem: 'Evolutive mobile per ispettori su campo di grandi telco',
        desc: 'Design evolutive per app mobile Sinfonist. UX per audit di ispezione su campo e gestione documenti.',
        tags: [
          { label: 'Mobile', type: 'design' },
          { label: 'Enterprise', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'Primo progetto enterprise: architettura 5 librerie Angular su repo separati',
        desc: 'Angular 8→9 con architettura a librerie separate per dominio. Sviluppo di oltre 2 anni.',
        tags: [
          { label: 'Angular 9', type: 'tech' },
          { label: 'RxJS', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          "L'app mobile Sinfonist per le ispezioni sul campo aveva bisogno di evolutive frequenti in parallelo con il prodotto web. <strong>Sfida: progettare per ispettori su campo con vincoli di connettività e dispositivi aziendali fissi.</strong>",
        user: "Ispettori aziendali di grandi telco (Fastweb, Sielte). Contesto d'uso: cantieri, edifici, scarsa connessione. Dispositivi: Android aziendali.",
        steps: [
          {
            n: '01',
            title: "Analisi casi d'uso mobile",
            desc: 'Interviste con i referenti Fastweb per capire i flussi di ispezione sul campo. Priorità: velocità di inserimento dati, non ricchezza visiva.',
          },
          {
            n: '02',
            title: 'Design evolutive',
            desc: 'Progettazione di nuovi moduli (QSM mobile, firma digitale) in continuità con il design esistente.',
          },
          {
            n: '03',
            title: 'Handoff sviluppo',
            desc: "Specifiche dettagliate per il team mobile. Feedback loop settimanale per validare l'implementazione.",
          },
        ],
        metrics: [
          { value: '2', label: 'Anni sul progetto' },
          { value: '2+', label: 'Clienti enterprise' },
          { value: '5', label: 'Moduli applicazione' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Primo progetto enterprise: 5 librerie Angular indipendenti su repository separati, team di 6 persone, 2 anni. <strong>Imparare i pattern enterprise mentre si porta avanti un prodotto in produzione per clienti reali.</strong>',
        steps: [
          {
            n: '01',
            title: 'Architettura modulare',
            desc: "5 librerie Angular (Core, QSM, Audit, DSM, Billing) come package separati. Dependency injection per l'integrazione tra librerie.",
          },
          {
            n: '02',
            title: 'Angular 8 → 9',
            desc: 'Migrazione in produzione coordinata con il team BE (C#). Nessun downtime per i clienti enterprise.',
          },
          {
            n: '03',
            title: 'Workflow team',
            desc: 'Prima esperienza di code review strutturata, branching strategy e release management su un prodotto enterprise.',
          },
        ],
        metrics: [
          { value: '5', label: 'Librerie Angular' },
          { value: '2', label: 'Anni in produzione' },
          { value: '3+3', label: 'Team FE + BE' },
        ],
        note: 'Primo progetto enterprise. La distanza tra il codice accademico e quello produzione era abissale” questo progetto è stata la scuola di formazione reale.',
        highlightTech: ['Angular 9', 'RxJS'],
      },
    },
  },
  {
    nome: 'Crowd Frame',
    descrizione:
      'Framework per il crowdsourcing di annotazioni web a cui ho contribuito in due tesi. Nella triennale (Angular 8) ho integrato task con gestione del timer. Nella magistrale (Angular 15) ho progettato e realizzato un chatbot per task di crowdsourcing conversazionale, curando styling, flussi UX e analisi delle performance sugli utenti.',
    urlPreview: 'https://github.com/Miccighel/Crowd_Frame',
    anno: 2022,
    images: [
      'assets/images/projects/crowd-frame/1.webp',
      'assets/images/projects/crowd-frame/2.webp',
      'assets/images/projects/crowd-frame/3.webp',
    ],
    type: 'both',
    variants: {
      all: {
        problem:
          "Chatbot per crowdsourcing conversazionale: dal design all'analisi performance",
        desc: 'Due tesi su Crowd Frame. Triennale: task timer. Magistrale: chatbot conversazionale Angular 15.',
        tags: [
          { label: 'Università', type: 'design' },

          { label: 'Angular', type: 'tech' },
          { label: 'Python', type: 'tech' },
        ],
        type: 'both',
      },
      design: {
        problem:
          'Come progettare un chatbot per raccogliere annotazioni da crowd worker non esperti',
        desc: 'UX del chatbot Crowd Frame: flussi conversazionali, test con utenti reali e analisi performance annotazioni.',
        tags: [
          { label: 'Università', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'Chatbot integrato in framework Angular open source senza rompere la compatibilità',
        desc: 'Angular 15 chatbot su Crowd Frame. Timer task (triennale) + conversational crowdsourcing (magistrale).',
        tags: [
          { label: 'Angular 15', type: 'tech' },
          { label: 'Python', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          'I task di annotazione tradizionali generano bassa qualità quando i worker non capiscono le istruzioni. <strong>Obiettivo: un chatbot che guidasse i worker attraverso il task in modo conversazionale per migliorare la qualità.</strong>',
        user: 'Crowd worker su Mechanical Turk e piattaforme simili. Background eterogeneo, bassa familiarità con task di annotazione accademica.',
        steps: [
          {
            n: '01',
            title: 'Flussi conversazionali',
            desc: "Mappatura di 4 tipologie di task in formato conversazionale. Design delle domande per ridurre l'ambiguità nelle istruzioni.",
          },
          {
            n: '02',
            title: 'Prototipazione UI chatbot',
            desc: 'UI chatbot integrata nella shell Crowd Frame. Rispetto dei vincoli tecnici del framework esistente.',
          },
          {
            n: '03',
            title: 'Analisi performance',
            desc: 'Esperimento con 50+ worker su Mechanical Turk. Confronto qualità annotazioni: chatbot vs. form tradizionale.',
          },
        ],
        metrics: [
          { value: '50+', label: 'Worker testati' },
          { value: '4', label: 'Task tipologie' },
          { value: '2', label: 'Tesi di laurea' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          'Integrare un chatbot conversazionale in un framework Angular open source esistente senza rompere la compatibilità con i task non-chatbot. <strong>Il framework era usato da altri ricercatori” ogni modifica doveva essere backward compatible.</strong>',
        steps: [
          {
            n: '01',
            title: 'Triennale” Timer task',
            desc: 'Integrazione di task con gestione avanzata del timer in Angular 8. Contributo al repository open source del laboratorio.',
          },
          {
            n: '02',
            title: 'Magistrale” Chatbot',
            desc: "Chatbot come nuovo tipo di task in Angular 15. Componente autonomo che rispetta l'interfaccia del framework.",
          },
          {
            n: '03',
            title: 'Analisi dati',
            desc: 'Script Python per analisi dei log di interazione. Confronto statistico tra le performance dei worker nei due formati.',
          },
        ],
        metrics: [
          { value: '2', label: 'Versioni Angular (8, 15)' },
          { value: '1', label: 'Repo open source contribuito' },
          { value: '50+', label: 'Worker analizzati' },
        ],
        highlightTech: ['Angular 15', 'Python'],
      },
    },
  },
  // 2021
  {
    nome: 'Gestionali aziendali',
    descrizione:
      'CRM per la gestione di lavori e personale realizzati per Mind The App. Progetti per Hydra, Spurgo CanalJet, Fast&Clean e Amici di Nico, sviluppati in Vue 2 e Vue 3 partendo da una base comune e poi verticalizzati per ogni cliente.',
    urlPreview: '',
    anno: 2021,
    images: ['assets/images/projects/default.webp'],
    type: 'dev',
    variants: {
      all: {
        problem:
          '4 CRM su misura da una base Vue comune per PMI del settore servizi',
        desc: 'Vue 2/3 base condivisa verticalizzata per Hydra, Spurgo CanalJet, Fast&Clean e Amici di Nico.',
        tags: [
          { label: 'Enterprise', type: 'design' },
          { label: 'Vue', type: 'tech' },
        ],
        type: 'dev',
      },
      design: {
        problem:
          'Adattare la stessa UI a 4 clienti con processi operativi diversi',
        desc: 'UI customizzazione per ogni cliente: stessa base, brand e flussi adattati al contesto di ogni azienda.',
        tags: [
          { label: 'UI', type: 'design' },
          { label: 'Customizzazione', type: 'design' },
        ],
        type: 'dev',
      },
      dev: {
        problem:
          'Codebase Vue condivisa verticalizzabile per clienti con requisiti diversi',
        desc: 'Base comune Vue 2/3 con estensioni per cliente. Gestione lavori, personale e pratiche amministrative.',
        tags: [
          { label: 'Vue 2', type: 'tech' },
          { label: 'Vue 3', type: 'tech' },
        ],
        type: 'dev',
      },
    },
    drawerContent: {
      design: {
        problem:
          '4 aziende diverse con processi operativi diversi avevano bisogno di strumenti di gestione personalizzati con costi di sviluppo contenuti. <strong>Soluzione: una base UI comune con verticalizzazioni per cliente.</strong>',
        user: 'Operatori aziendali di PMI del settore servizi (pulizie, spurgo, cura animali). Bassa alfabetizzazione digitale” priorità alla semplicità.',
        steps: [
          {
            n: '01',
            title: 'Analisi per cliente',
            desc: 'Raccolta requisiti separata per ogni cliente. Identificazione del subset comune (gestione lavori, dipendenti, report) e delle esigenze specifiche.',
          },
          {
            n: '02',
            title: 'Base UI condivisa',
            desc: 'Layout e componenti comuni tra le 4 verticalizzazioni. Brand color e loghi personalizzati per cliente.',
          },
          {
            n: '03',
            title: 'Verticalizzazioni',
            desc: 'Adattamento dei flussi per ogni settore: gestione interventi per Hydra, turni per Fast&Clean, animali per Amici di Nico.',
          },
        ],
        metrics: [
          { value: '4', label: 'Clienti' },
          { value: '1', label: 'Codebase base' },
          { value: '~70%', label: 'Codice condiviso' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          '4 gestionali con requisiti diversi da sviluppare in parallelo con un team piccolo. <strong>Architettura che massimizzi il riuso del codice senza creare accoppiamento tra i progetti dei clienti.</strong>',
        steps: [
          {
            n: '01',
            title: 'Architettura base comune',
            desc: 'Struttura Vue con moduli condivisi (auth, layout, tabelle, form) distribuiti come dipendenza interna tra i 4 progetti.',
          },
          {
            n: '02',
            title: 'Verticalizzazione',
            desc: 'Estensione della base con moduli specifici per cliente. Nessuna modifica alla base per aggiungere funzionalità cliente.',
          },
          {
            n: '03',
            title: 'Migrazione Vue 2→3',
            desc: 'Aggiornamento progressivo dei progetti da Vue 2 a Vue 3 man mano che le funzionalità lo permettevano.',
          },
        ],
        metrics: [
          { value: '4', label: 'Gestionali in parallelo' },
          { value: 'Vue 2→3', label: 'Migrazione' },
          { value: '1', label: 'Team sviluppo' },
        ],
        highlightTech: ['Vue 2', 'Vue 3'],
      },
    },
  },
  {
    nome: 'MyHealthStory',
    descrizione:
      'Prima app mobile progettata da zero e realizzata in Flutter 2 per un progetto universitario. Permette agli utenti di gestire la propria cartella clinica, impostare reminder per appuntamenti e assunzione farmaci.',
    urlPreview: '',
    anno: 2021,
    images: ['assets/images/projects/myhealthstory/1.webp'],
    type: 'both',
    variants: {
      all: {
        problem: 'App mobile per la gestione della cartella clinica personale',
        desc: 'Prima app mobile: Flutter 2, design completo in Figma. Progetto universitario.',
        tags: [
          { label: 'Mobile', type: 'design' },
          { label: 'Università', type: 'design' },
          { label: 'Flutter', type: 'tech' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      design: {
        problem:
          'Come rendere la gestione della salute personale accessibile e non ansiogena',
        desc: 'Prima app progettata da zero: UX per cartella clinica, reminder farmaci e appuntamenti in Figma.',
        tags: [
          { label: 'Università', type: 'design' },
          { label: 'Figma', type: 'design' },
        ],
        type: 'both',
      },
      dev: {
        problem:
          'Prima app Flutter: state management, persistenza locale e notifiche push',
        desc: 'Flutter 2 con gestione stato locale, persistenza e notifiche per reminder appuntamenti e farmaci.',
        tags: [
          { label: 'Mobile', type: 'design' },
          { label: 'Università', type: 'design' },
          { label: 'Flutter 2', type: 'tech' },
        ],
        type: 'both',
      },
    },
    drawerContent: {
      design: {
        problem:
          "La gestione della salute personale è spesso ansiogena per chi non ha competenze mediche. <strong>Obiettivo: un'app che rendesse la propria storia clinica leggibile, non intimidatoria.</strong>",
        user: 'Utenti generici senza formazione medica. Bisogno principale: avere tutto in un posto senza dover ricordare manualmente appuntamenti e farmaci.',
        steps: [
          {
            n: '01',
            title: 'Ricerca e concept',
            desc: 'Analisi di 3 app competitor (Medisafe, MyChart). Gap identificati: linguaggio troppo medico, navigazione troppo complessa.',
          },
          {
            n: '02',
            title: 'Architettura informativa',
            desc: '3 aree principali: documenti, reminder, storico. Navigazione bottom tab per accesso immediato alle funzioni core.',
          },
          {
            n: '03',
            title: 'UI design',
            desc: "Palette tenue per ridurre l'ansia visiva tipica delle app mediche. Icone custom per i tipi di documento sanitario.",
          },
        ],
        metrics: [
          { value: '3', label: 'Sezioni principali' },
          { value: '0', label: "Gergo medico nell'UI" },
          { value: '1', label: 'Prima app progettata' },
        ],
        highlightTech: [],
      },
      dev: {
        problem:
          "Prima app Flutter da zero: state management, persistenza locale e notifiche push senza backend. <strong>Ogni scelta tecnica era anche di apprendimento” la semplicità dell'architettura era vincolo e obiettivo.</strong>",
        steps: [
          {
            n: '01',
            title: 'Setup Flutter 2',
            desc: 'Prima applicazione Flutter. Setup progetto, navigation, theming e struttura cartelle seguendo le best practice del momento.',
          },
          {
            n: '02',
            title: 'State e persistenza',
            desc: 'Provider per gestione stato, dati solo on-device.',
          },
          {
            n: '03',
            title: 'Notifiche push',
            desc: 'flutter_local_notifications per reminder farmaci e appuntamenti. Gestione permessi iOS e Android.',
          },
        ],
        metrics: [
          { value: '0', label: 'Backend richiesto' },
          { value: '1', label: 'Prima app Flutter' },
        ],
        highlightTech: ['Flutter 2'],
      },
    },
  },
];
