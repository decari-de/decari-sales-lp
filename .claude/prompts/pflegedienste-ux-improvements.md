# Pflegedienste-Verzeichnis: UX/UI Verbesserungen

## Kontext

Das Pflegedienste-Verzeichnis ist live mit 16.027 Einträgen auf:
- Hauptseite: `/pflegedienste/`
- Bundesland: `/pflegedienste/[bundesland]/`
- Stadt: `/pflegedienste/[bundesland]/[stadt]/`
- Detail: `/pflegedienste/[bundesland]/[stadt]/[slug]/`

Ein Code-Review wurde bereits durchgeführt (Commit `a666118`). Jetzt soll die UX/UI verbessert werden.

## Aufgaben

### 1. Suchfunktion implementieren

**Ziel:** Nutzer sollen schnell einen Pflegedienst oder eine Stadt finden können.

**Optionen evaluieren:**
- **Client-side Suche:** Einfacher Textfilter mit JavaScript (Liste filtern)
- **Fuzzy Search:** Bibliothek wie Fuse.js für Tippfehler-Toleranz
- **Autocomplete:** Dropdown mit Vorschlägen beim Tippen

**Überlegungen:**
- 16.000 Einträge = ~2-4MB JSON im Browser (zu groß für Client-side?)
- Alternative: Nur Städte durchsuchbar machen (~4.000 Einträge)
- Oder: Serverseitige Suche mit Netlify/Cloudflare Functions?

**Empfehlung erarbeiten:** Was ist der beste Ansatz für eine statische Astro-Seite?

### 2. Navigation verbessern

**Aktuelle Probleme:**
- Keine schnelle Navigation zwischen Bundesländern
- Keine "Zurück zur Übersicht" Links prominent platziert
- Breadcrumbs allein reichen nicht für gute UX

**Mögliche Verbesserungen:**
- Sticky Sidebar mit Bundesland-Liste auf Desktop
- Dropdown/Select für Bundesland-Wechsel
- "Beliebte Städte" Quick-Links
- Alphabetische Filterleiste (A-Z) für Städte

### 3. "Über dieses Verzeichnis" Box stylen

**Aktueller Zustand:** Die Info-Box auf `/pflegedienste/` sieht ungestylt aus.

**Verbessern:**
- Konsistentes Card-Design mit dem Rest der Seite
- Icon hinzufügen (Info-Symbol)
- Eventuell als ausklappbares Accordion
- Oder: In Footer/Sidebar verschieben

### 4. Überschriften-Hierarchie prüfen

**Prüfen:**
- Sind H1/H2/H3 konsistent über alle Seiten?
- Visuelle Hierarchie verbessern
- Abstände und Typografie angleichen

### 5. Weitere UX Quick-Wins

- Scroll-to-top Button bei langen Listen
- "X Pflegedienste gefunden" Zähler prominenter
- Hover-States für Cards verbessern
- Loading States falls Suche implementiert wird

## Dateien zum Anschauen

```
src/pages/pflegedienste/index.astro          # Hauptseite mit "Über dieses Verzeichnis"
src/pages/pflegedienste/[bundesland]/index.astro
src/pages/pflegedienste/[bundesland]/[stadt]/index.astro
src/layouts/PflegedienstLayout.astro         # Detail-Seiten
src/components/StateCard.astro               # Bundesland-Karten
src/components/CityCard.astro                # Stadt-Karten
src/components/PflegedienstListItem.astro    # Listen-Einträge
```

## Technische Constraints

- **Framework:** Astro 5.x (Static Site Generation)
- **Styling:** Tailwind CSS
- **Hosting:** Cloudflare Pages (kein Server-Side Rendering)
- **Keine externe Suche-API** gewünscht (Algolia etc.)

## Erste Schritte

1. Öffne `http://localhost:4321/pflegedienste/` im Browser
2. Analysiere die aktuelle UX und Navigation
3. Erstelle einen Plan mit priorisierten Verbesserungen
4. Beginne mit Quick-Wins (Styling der Info-Box, Überschriften)
5. Evaluiere Suchfunktion-Optionen und präsentiere Empfehlung
