# CLAUDE.md

## Projekt

Decari Sales Landing Page - Statische Website für ambulante Pflegedienst-Digitalisierung.

**Live:** https://partner.decari.de

## Tech Stack

- **Framework:** Astro 5.x (Static Site Generator)
- **Styling:** Tailwind CSS 3.x
- **Hosting:** Cloudflare Pages (automatisches Deployment bei Push)
- **Sprache:** Deutsch

## Befehle

```bash
npm run dev      # Entwicklungsserver (localhost:4321)
npm run build    # Production-Build nach dist/
npm run preview  # Preview des Builds
```

## Projektstruktur

```
src/
├── components/
│   ├── Header.astro    # Einheitlicher Header (fixed, Glasmorphismus, Mobile-Menu)
│   ├── Footer.astro
│   └── Disclaimer.astro # Haftungsausschluss für Ratgeber-Artikel
├── layouts/
│   ├── BaseLayout.astro    # Hauptlayout mit SEO, Fonts, Calendly, Cookie-Banner
│   └── ArticleLayout.astro # Ratgeber-Artikel mit Breadcrumb, Disclaimer, CTA
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   ├── impressum.astro
│   ├── datenschutz.astro
│   └── ratgeber/
│       ├── index.astro
│       ├── sgb-xii-hilfe-zur-pflege.astro
│       ├── warum-mehr-klienten-nicht-die-loesung-ist.astro
│       ├── mitarbeiterbindung-pflege.astro
│       ├── pflegegeld-sachleistung.astro
│       ├── angebotskuerzung.astro
│       ├── vermoegensgrenzen-hzp.astro
│       ├── eingliederungshilfe.astro
│       ├── 37-3-beratungsbesuche.astro
│       └── scham-sozialleistungen.astro
├── content/        # Raw HTML-Imports (?raw Suffix, Präfix: ratgeber-*)
└── styles/
    └── global.css  # Tailwind + Custom CSS

public/
├── assets/         # Bilder (Logo, Favicon, Ursula)
├── js/             # Potenzialrechner
├── _redirects      # 301-Redirects /blog/ → /ratgeber/ (Cloudflare Pages)
├── robots.txt
└── sitemap.xml
```

## Farben (Tailwind)

- `navy`: #000F57 (Primär-Dunkel)
- `teal`: #097788 (Primär-Akzent)
- `teal-light`: #0a9db3 (Hover)

## Externe Dienste

- **Calendly:** Termin-Popup und Inline-Widget auf Startseite
- **Web3Forms:** Kontaktformular
- **Cloudflare Pages:** Hosting mit globalem CDN

## Wichtige Hinweise

- Ratgeber-Inhalte liegen als Raw-HTML in `src/content/ratgeber-*.html` und werden mit `?raw` importiert
- Potenzialrechner ist Vanilla JS in `public/js/potenzialrechner.js`
- Scripts die auf public/ Assets zugreifen brauchen `is:inline` Direktive
- Cookie-Banner wird in BaseLayout.astro gerendert (localStorage für Dismiss-Status)
- Kein Analytics aktiv (kein PostHog, kein Google Analytics)
- Alte `/blog/`-URLs werden per `public/_redirects` auf `/ratgeber/` umgeleitet (301)

## Deployment

Push zu `main` triggert automatisches Deployment auf Cloudflare Pages.
Preview-URLs werden automatisch für Branches/PRs erstellt.
