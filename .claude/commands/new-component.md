---
description: Crea un componente standalone secondo le convenzioni del repo
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(ls:*), Bash(npm run build-prod:*)
argument-hint: "<nome-componente> [componente padre]"
---

Crea un nuovo componente. Input: $ARGUMENTS

Leggi prima `.claude/docs/conventions.md`. **Non usare `ng generate`**: crea spec
inutili e non rispetta il layout delle cartelle figlie.

## Dove metterlo

- Componente di sezione o riusabile → `src/app/components/<nome>/`
- Figlio dedicato di un componente → dentro il padre, es.
  `src/app/components/projects/project-card/`

## File da creare

Tre file con lo stesso nome kebab-case: `.component.ts`, `.component.html`,
`.component.scss`. Niente `.spec.ts`.

```ts
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-<nome>',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './<nome>.component.html',
  styleUrl: './<nome>.component.scss',
})
export class <Nome>Component {
  // input signal-based, mai @Input()
}
```

## Regole da rispettare

- `standalone: true`, `imports` esplicito. Nessun `NgModule`.
- `input()` / `input.required()` / `output()` / `signal()` / `computed()`.
- `inject()` per le dipendenze.
- Ogni testo nel template passa da `| transloco`, con le chiavi aggiunte in
  **entrambi** `public/assets/i18n/it.json` e `en.json`.
- Nello SCSS usa i token esistenti (`var(--accent)`, `var(--black02)`,
  `var(--font-family-titles)`), mai hex inline.
- Se il componente dipende dalla portfolio mode, ricevila come `input()` dal
  padre. Inietta `PortfolioModeService` con `toSignal()` solo se è un componente
  di primo livello.
- Se usi componenti PrimeNG, gli override di stile vanno in
  `public/assets/theme/_<componente>.scss`, non con `!important` locale.
- Il componente viene istanziato anche durante il prerender: `window`,
  `navigator`, `localStorage`, `canvas` e i loop di `setTimeout` vanno dietro
  `isPlatformBrowser(inject(PLATFORM_ID))`, e per il DOM si usa
  `inject(DOCUMENT)`.

## Chiudere

1. Aggiungi il componente all'array `imports` del padre.
2. Aggiungi le chiavi i18n nelle due lingue.
3. `npm run build-prod`.
