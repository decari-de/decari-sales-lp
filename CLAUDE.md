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
│   ├── Header.astro    # Header mit variant-Prop (home|blog-index|blog-article|404)
│   └── Footer.astro
├── layouts/
│   ├── BaseLayout.astro        # Hauptlayout mit SEO, Fonts, Calendly, Cookie-Banner
│   └── BlogArticleLayout.astro # Blog-Artikel mit Breadcrumb
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   ├── impressum.astro
│   ├── datenschutz.astro
│   └── blog/
│       ├── index.astro
│       ├── sgb-xii-hilfe-zur-pflege.astro
│       ├── warum-mehr-klienten-nicht-die-loesung-ist.astro
│       └── mitarbeiterbindung-pflege.astro
├── content/        # Raw HTML-Imports (?raw Suffix)
└── styles/
    └── global.css  # Tailwind + Custom CSS

public/
├── assets/         # Bilder (Logo, Favicon, Ursula)
├── js/             # Potenzialrechner
├── robots.txt
└── sitemap.xml
```

## Header-Varianten

Die Header-Komponente akzeptiert einen `variant`-Prop:

| Variant | Verhalten |
|---------|-----------|
| `home` | Fixed, Glasmorphismus, Mobile-Menu, Calendly-Popup |
| `blog-index` | Statisch, Links zu Startseite/Rechner |
| `blog-article` | Statisch, Link zum Blog |
| `404` | Minimal, nur "Zur Startseite" Button |

## Farben (Tailwind)

- `navy`: #000F57 (Primär-Dunkel)
- `teal`: #097788 (Primär-Akzent)
- `teal-light`: #0a9db3 (Hover)

## Externe Dienste

- **Calendly:** Termin-Popup und Inline-Widget auf Startseite
- **Web3Forms:** Kontaktformular
- **Cloudflare Pages:** Hosting mit globalem CDN

## Wichtige Hinweise

- Blog-Inhalte liegen als Raw-HTML in `src/content/` und werden mit `?raw` importiert
- Potenzialrechner ist Vanilla JS in `public/js/potenzialrechner.js`
- Scripts die auf public/ Assets zugreifen brauchen `is:inline` Direktive
- Cookie-Banner wird in BaseLayout.astro gerendert (localStorage für Dismiss-Status)
- Kein Analytics aktiv (kein PostHog, kein Google Analytics)

## Deployment

Push zu `main` triggert automatisches Deployment auf Cloudflare Pages.
Preview-URLs werden automatisch für Branches/PRs erstellt.
