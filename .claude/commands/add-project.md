---
description: Aggiunge un progetto al portfolio seguendo il modello dati esistente
allowed-tools: Read, Edit, Grep, Glob, Bash(ls:*), Bash(grep:*), Bash(npm run build-prod:*)
argument-hint: "<nome progetto> [anno]"
---

Aggiungi un progetto al portfolio. Input: $ARGUMENTS

Leggi prima `.claude/docs/data-model.md`.

Questo comando copre il caso in cui i contenuti ci sono già e va solo scritta la
voce. Altrimenti usa una skill:

- input è una **cartella di materiale** (screenshot, export, brief) →
  `material-import`
- input è un **repository o un URL** → `project-intake` (a livello utente)

## Procedura

1. **Raccogli quello che manca.** Servono: nome, anno, `urlPreview`, a quale mode
   appartiene (`design` / `dev` / entrambe), il problema che risolve e le
   tecnologie usate. Se manca qualcosa di essenziale, chiedilo — non inventare
   contenuti di portfolio.

2. **Immagini.** Controlla se esiste già
   `public/assets/images/projects/<slug>/`:

   ```bash
   ls public/assets/images/projects/
   ```

   Se non c'è, dillo all'utente e procedi lasciando `images` vuoto o con i path
   attesi (`assets/images/projects/<slug>/1.webp`), segnalando che i file vanno
   aggiunti. Slug in kebab-case. Path **senza** slash iniziale.

3. **Riusa i tag esistenti.** Guarda le label già in uso prima di crearne di nuove:

   ```bash
   grep -oE "label: '[^']+'" src/app/data/projects.data.ts | sort | uniq -c | sort -rn
   ```

   Una label nuova crea una nuova voce di filtro: usane una nuova solo se serve.

4. **Scrivi la voce** in `src/app/data/projects.data.ts`, nel blocco dell'anno
   giusto (il file ha commenti `// 2026`, `// 2025`, ...). Compila tutte e tre le
   `variants` (`all`, `design`, `dev`): il tipo le richiede.

   - `problem`: una frase, la domanda a cui il progetto risponde
   - `desc`: 2-3 righe, il testo della card
   - `variants.design` punta sul processo e sulle scelte di prodotto
   - `variants.dev` punta sull'architettura e sui vincoli tecnici

5. **`drawerContent`** solo se hai un case study reale (steps `'01'`, `'02'`, ...
   e metriche con numeri veri). Senza, ometti il campo: il drawer usa la versione
   ridotta. Non inventare metriche.

6. **Verifica:**

   ```bash
   npm run build-prod
   ```

   Poi apri `/projects` e controlla la card e il drawer in tutte e tre le mode.

## Vincoli

- Nessuna stringa i18n da aggiungere: il contenuto dei progetti sta nei dati, non
  nelle traduzioni.
- Non riordinare né riformattare il resto di `projects.data.ts`.
- Il file è già ~1800 righe: usa Edit mirati, non riscriverlo.
