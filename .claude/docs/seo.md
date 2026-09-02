# SEO e prerender

## I due livelli

**1. Statico — `src/index.html`.** Contiene i valori di default: `lang="it"`,
title, meta description, canonical, blocco Open Graph, Twitter card, `theme-color`
e un JSON-LD `Person`. È quello che vedono i crawler che non eseguono JavaScript
e i preview dei social sulle pagine non prerenderizzate.

**2. Per rotta — `SeoService` + `seoGuard`.** A ogni navigazione il guard legge
`title` e `description` da `route.data` e chiama `SeoService.update()`, che
aggiorna title, `meta[name=description]`, `og:title`, `og:description`, `og:url`,
`twitter:title`, `twitter:description` e `link[rel=canonical]`.

Poiché le rotte sono prerenderizzate, il risultato del secondo livello finisce
**dentro l'HTML statico**: `dist/browser/projects/index.html` esce dalla build
con il proprio titolo e la propria descrizione, non con quelli di default.

## Aggiungere una rotta

I metadati vivono in `app.routes.ts`, non nel componente:

```ts
{
  path: 'about',
  loadComponent: () => import('...').then((m) => m.AboutComponent),
  data: {
    title: 'Chi sono',
    description: 'Una frase di 140-160 caratteri, specifica per questa pagina.',
  },
  canActivate: [seoGuard],
}
```

Poi aggiungi la URL a `public/sitemap.xml`. Il prerender scopre le rotte da solo
dal router: non serve elencarle altrove.

## File di supporto

| File | Note |
| --- | --- |
| `public/robots.txt` | consente tutto e punta alla sitemap |
| `public/sitemap.xml` | va aggiornata a mano quando aggiungi una rotta |
| `public/404.html` | fallback SPA per i path non prerenderizzati |

## Immagine social

`og:image` punta a `icons/icon-512x512.png`. È un ripiego: funziona, ma è
quadrata e mostra solo il logo.

**Da fare:** una `public/og-image.png` da 1200×630 con nome, ruolo e un
riferimento visivo, poi aggiornare `og:image`, `og:image:width`,
`og:image:height` e `twitter:image` in `index.html`. È l'unico intervento SEO
ancora aperto e l'unico che si vede davvero quando il link viene condiviso.

## Verificare

Dopo `npm run build-prod`:

```bash
node -e "
const fs=require('fs');
for (const f of ['dist/browser/index.html','dist/browser/projects/index.html']) {
  const h=fs.readFileSync(f,'utf8');
  console.log(f, (h.match(/<title>[^<]*<\/title>/)||[])[0]);
  console.log('  ', (h.match(/<meta name=\"description\"[^>]*>/)||[])[0]);
}
"
```

Ogni pagina deve avere titolo e descrizione propri. Se sono uguali fra loro, il
guard non è collegato alla rotta.

Controlla anche il **peso dell'HTML**: sopra i ~200 KB per pagina qualcosa sta
finendo nell'HTML che non dovrebbe (tipicamente il transfer cache HTTP, vedi
[architecture.md](./architecture.md)).

## Dominio

URL e canonical sono cablati su `https://lorisparata98.github.io` in
`index.html`, `seo.service.ts` (`SITE_URL`), `robots.txt` e `sitemap.xml`. Se il
sito passa a un dominio custom, vanno aggiornati tutti e quattro.
