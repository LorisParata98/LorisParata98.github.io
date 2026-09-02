# Modello dati progetti

Tutti i contenuti dei progetti vivono in `src/app/data/projects.data.ts`
(`export const allProjects: Project[]`). I tipi sono in
`src/app/models/project.model.ts`. Non c'è backend né CMS: il file finisce nel
bundle.

## Tipi

```ts
interface Project {
  nome: string;
  descrizione: string;          // fallback quando manca la variant
  urlPreview: string;           // link esterno al progetto live
  anno: number;                 // usato per raggruppare in sezioni
  images?: string[];            // path relativi, senza slash iniziale
  type?: 'both' | 'design' | 'dev';
  variants?: { all: ProjectVariant; design: ProjectVariant; dev: ProjectVariant };
  drawerContent?: { design: DrawerContent; dev: DrawerContent };
}

interface ProjectVariant {
  problem: string;              // domanda/problema in una riga
  desc: string;                 // descrizione mostrata nella card
  tags: ProjectTag[];
  type: 'both' | 'design' | 'dev';
}

interface ProjectTag {
  label: string;                // è anche la chiave del filtro: deve essere stabile
  type: 'design' | 'tech' | 'common';
}

interface DrawerContent {       // case study nel drawer di dettaglio
  problem: string;              // supporta HTML inline (<strong>, <br>)
  user?: string;                // mostrato solo se showUser è true
  steps: DrawerStep[];          // { n: '01', title, desc }
  metrics: { value: string; label: string }[];
  note?: string;
  highlightTech: string[];
}

interface YearSection {         // derivato a runtime, non da scrivere a mano
  year: number;
  projects: Project[];
}
```

## Come i campi vengono consumati

| Campo | Dove viene letto |
| --- | --- |
| `variants[mode]` | `ProjectCardComponent` (desc + tag), `ProjectDrawerComponent`. Fallback: `variants.all`, poi `descrizione` |
| `variants[mode].tags[].label` | costruisce l'elenco filtri in `ProjectsComponent.allFilterTags` e il matching in `filteredProjects` |
| `variants[mode].tags[].type` | evidenziazione: in mode `dev` risaltano i tag `tech`, in mode `design` quelli `design` |
| `anno` | `ProjectsComponent.sections` raggruppa e ordina in senso decrescente |
| `images` | carousel del drawer (`currentImageIndex`, animazione `imageSlide`) |
| `drawerContent.design` / `.dev` | `activeDrawerData`: mostrato **solo** in mode `design` o `dev`. In mode `all` il drawer usa il contenuto base |
| `urlPreview` | link "vedi live" |

Punti che rompono facilmente le cose:

- **`variants` deve avere tutte e tre le chiavi** (`all`, `design`, `dev`): il tipo
  non le rende opzionali. Se un progetto ha senso in una sola mode, replica il
  contenuto invece di omettere la chiave.
- **`label` dei tag è l'identificatore del filtro.** Cambiarla su un progetto e
  non sugli altri spezza il raggruppamento: verrà mostrata come due voci distinte.
  Le label non passano da Transloco (sono nomi di tecnologie/categorie).
- `drawerContent` è opzionale: senza, `hasRichContent` è `false` e il drawer
  mostra la versione ridotta.

## Aggiungere un progetto

1. **Immagini** in `public/assets/images/projects/<slug-progetto>/`, formato
   `webp` (o `gif` per le demo animate), nominate `1.webp`, `2.webp`, ...
   Lo slug è kebab-case (`cash-your-trash`, `cv-builder`).
2. **Voce** in `allProjects` dentro `src/app/data/projects.data.ts`. Il file è
   organizzato per anno con commenti `// 2026`: inserisci nel blocco giusto.
3. Compila `variants.all`, `variants.design`, `variants.dev`. La `desc` della card
   sta su 2-3 righe; il `problem` è una frase sola.
4. Riusa **label di tag già esistenti** dove possibile. Per vedere quelle in uso:

   ```bash
   grep -oE "label: '[^']+'" src/app/data/projects.data.ts | sort -u
   ```

5. `drawerContent` solo se hai un case study vero (steps + metriche). Gli `n`
   degli step sono stringhe `'01'`, `'02'`, ...
6. Verifica con `npm run build-prod` e apri `/projects` provando tutte e tre le
   mode.

## Path immagini

Sempre relativi, senza slash iniziale:

```ts
images: ['assets/images/projects/cv-builder/1.webp']   // corretto
images: ['/assets/images/projects/cv-builder/1.webp']  // rompe su GitHub Pages
```

La cartella `public/` viene copiata alla radice della build (glob `**/*` in
`angular.json`), quindi `public/assets/...` diventa `assets/...`.

## HTML nelle stringhe

`DrawerContent.problem` e alcune chiavi i18n (`*.titleHtml`) contengono markup
inline (`<strong>`, `<br>`) renderizzato con `innerHTML`. Il contenuto è tutto
scritto a mano nel repo, mai da input utente. Non introdurre `innerHTML` su dati
che non provengano da questo file o dai JSON di traduzione.
