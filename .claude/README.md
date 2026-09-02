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
