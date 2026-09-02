# .claude

Configurazione per lavorare su questo repository con agenti (Claude Code).
Tutto qui dentro è versionato tranne `settings.local.json`.

```
.claude/
├── settings.json      permessi tool a livello di progetto
├── docs/              documentazione tecnica di riferimento
├── commands/          slash command (/verify, /add-project, ...)
└── agents/            subagent specializzati
```

L'entry point è `CLAUDE.md` nella root: viene caricato automaticamente a ogni
sessione e rimanda ai documenti di questa cartella.

## Documentazione

| File | Quando leggerlo |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | prima di toccare boot, routing, servizi, styling |
| [docs/conventions.md](docs/conventions.md) | prima di scrivere qualsiasi componente |
| [docs/data-model.md](docs/data-model.md) | prima di toccare i progetti del portfolio |
| [docs/i18n.md](docs/i18n.md) | prima di toccare testi o traduzioni |
| [docs/pwa.md](docs/pwa.md) | service worker, install prompt, notifiche |
| [docs/seo.md](docs/seo.md) | meta tag, prerender, sitemap |
| [docs/deployment.md](docs/deployment.md) | build, GitHub Actions, routing su Pages |
| [docs/known-issues.md](docs/known-issues.md) | prima di "sistemare" qualcosa che sembra sbagliato |

## Comandi

| Comando | Cosa fa |
| --- | --- |
| `/verify` | gate prima di consegnare: build, allineamento i18n, controlli sul diff |
| `/i18n-check` | confronta `it.json` ed `en.json`, trova chiavi mancanti o orfane (`--fix` per correggere) |
| `/add-project` | aggiunge un progetto al portfolio seguendo il modello dati |
| `/new-component` | crea un componente standalone secondo le convenzioni |

## Skill

Si attivano da sole quando il contesto corrisponde alla loro `description`.

| Skill | Input | Dove vive |
| --- | --- | --- |
| [`material-import`](skills/material-import/SKILL.md) | cartella di materiale (screenshot, export, brief) | in questo repo |
| `project-intake` | repository o URL del progetto | a livello utente |

### material-import

Inventaria una cartella di materiale, converte le immagini in webp dentro
`public/assets/images/projects/<slug>/` e compone la voce `Project`.

```bash
# 1. inventario: immagini con dimensioni, duplicati, documenti, video
node .claude/skills/material-import/scripts/import-material.mjs "<path-materiale>"

# 2. import nell'ordine deciso, la prima è la copertina
node .claude/skills/material-import/scripts/import-material.mjs "<path>" \
     --slug <slug> --import "hero.png,dashboard.png"
```

### project-intake

Estrae da un repository o da un URL le informazioni per aggiungere il progetto a
`/projects`, compone la voce `Project` e cattura le immagini.

Vive **a livello utente**, non in questo repo: `~/.claude/skills/project-intake/`.
Non è quindi versionata qui. Include due script:

```bash
# evidenze dal repo di origine: stack, date, README, URL, tag proponibili
node $HOME/.claude/skills/project-intake/scripts/scan-project.mjs <path-progetto>

# screenshot webp, conversione immagini, frame per una GIF demo
node $HOME/.claude/skills/project-intake/scripts/capture-media.mjs <url> --slug <slug>
```

`capture-media.mjs` usa Chrome headless via DevTools Protocol e non richiede
dipendenze npm: Chrome codifica webp nativamente. Serve ffmpeg solo per
comporre le GIF, e in sua assenza lo script lascia i frame e stampa il comando.

## Agenti

| Agente | Uso |
| --- | --- |
| `angular-reviewer` | rivede il diff contro le convenzioni del repo (read-only) |
| `i18n-auditor` | verifica l'integrità delle traduzioni (read-only) |

## Manutenzione

Questa documentazione va aggiornata quando cambiano:

- il modello dati dei progetti (`models/project.model.ts`)
- i provider globali (`app.config.ts` / `app.config.server.ts`)
- le rotte e i loro metadati SEO (`app.routes.ts`)
- il workflow di deploy (`.github/workflows/main.yaml`)
- i valori della portfolio mode (`'all' | 'design' | 'dev'`)
- la baseline i18n citata in `docs/i18n.md` e `agents/i18n-auditor.md`
- gli ordini di grandezza dei bundle citati in `docs/deployment.md`
