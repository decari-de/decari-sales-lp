# CLAUDE.md

## Projekt

Decari Sales Landing Page - Statische Website für ambulante Pflegedienst-Digitalisierung.

## Tech Stack

- **Framework:** Astro 5.x (Static Site Generator)
- **Styling:** Tailwind CSS 3.x
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
├── components/     # Wiederverwendbare Komponenten
│   ├── Header.astro    # Header mit variant-Prop (home|blog-index|blog-article|404)
│   └── Footer.astro
├── layouts/
│   ├── BaseLayout.astro        # Hauptlayout mit SEO, Fonts, Calendly
│   └── BlogArticleLayout.astro # Blog-Artikel mit Breadcrumb
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   └── blog/
├── content/        # Raw HTML-Imports (?raw Suffix)
└── styles/
    └── global.css  # Tailwind + Custom CSS

public/
├── assets/         # Bilder (Logo, Favicon)
├── js/             # ROI-Calculator
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

- **Calendly:** Termin-Popup auf Startseite
- **PostHog:** Analytics (in BaseLayout)
- **Brevo:** Kontaktformular

## Wichtige Hinweise

- Blog-Inhalte liegen als Raw-HTML in `src/content/` und werden mit `?raw` importiert
- ROI-Calculator ist Vanilla JS in `public/js/roi-calculator.js`
- Scripts die auf public/ Assets zugreifen brauchen `is:inline` Direktive
