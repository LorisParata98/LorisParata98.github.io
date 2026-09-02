---
description: Confronta it.json ed en.json e trova chiavi mancanti o non usate
allowed-tools: Bash(node -e:*), Bash(grep:*), Read, Edit
argument-hint: "[--fix per aggiungere le chiavi mancanti]"
---

Controlla lo stato dell'i18n. Argomenti: $ARGUMENTS

## 1. Chiavi disallineate tra le due lingue

```bash
node -e "
const fs=require('fs');
const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?flat(v,p+k+'.'):[p+k]);
const it=flat(JSON.parse(fs.readFileSync('public/assets/i18n/it.json','utf8')));
const en=flat(JSON.parse(fs.readFileSync('public/assets/i18n/en.json','utf8')));
console.log('it:',it.length,'en:',en.length);
console.log('--- mancanti in en ---'); console.log(it.filter(k=>!en.includes(k)).join('\n'));
console.log('--- mancanti in it ---'); console.log(en.filter(k=>!it.includes(k)).join('\n'));
"
```

## 2. Chiavi usate nei template ma inesistenti

Estrai le chiavi dai template e verifica che esistano in `it.json`:

```bash
grep -rhoE "'[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z0-9_]+)+'\s*\|\s*transloco" src/app --include=*.html | grep -oE "'[^']+'" | tr -d "'" | sort -u
```

Ricorda che esistono chiavi **costruite a runtime** e quindi invisibili al grep:

- `projects.hero.${mode}.titleHtml`
- `toggle.badge.${mode}`
- `menu.*` (da `LayoutService.menuItems`)

Non segnalarle come inutilizzate.

## 3. Report

Elenca:

- chiavi mancanti per lingua (baseline noto: 78 in `en`, 4 in `it`, quasi tutte
  sotto `primeng.*`)
- chiavi usate nei template ma assenti dai JSON — **queste sono bug reali**
- chiavi presenti nei JSON e mai usate (candidate alla rimozione, non rimuoverle
  da solo)

## Con `--fix`

Aggiungi solo le chiavi che mancano e che sono realmente usate dai template,
rispettando l'annidamento e l'ordine dei namespace esistenti. Traduci il valore
nella lingua di destinazione. Non toccare il blocco `primeng.*`: non è collegato
e riempirlo non serve. Non rimuovere mai chiavi.
