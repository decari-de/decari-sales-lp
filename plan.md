# Decari Landing Page – Vollständiger Kontext für Claude Code

## Projektauftrag

Erstelle eine **Conversion-optimierte Landing Page** für Decari GmbH mit **Pure HTML + Tailwind CSS**. Die Seite soll Pflegedienst-Ketten und stationäre Heime dazu bringen, ein Erstgespräch zu buchen.

**Kernbotschaft:** Mehr Umsatz mit bestehenden Klienten – ohne zusätzliches Personal.

**Warum Pure HTML statt Framework?**
- Maximale Kontrolle, keine versteckten Abstraktionen
- Claude-freundlich: HTML + CSS ist das einfachste Setup
- Zero Build-Step nötig (Tailwind CDN)
- Schnelle Iteration, WYSIWYG
- Projektumfang rechtfertigt kein Framework (1 Landing Page + 3-5 Blog-Artikel)

---

## Über Decari

### Was Decari macht
Decari ist ein **Full-Service Case-Management-Dienstleister**, der für Pflegedienste die komplette Beantragung zusätzlicher Sozialleistungen übernimmt – speziell Leistungen, die über den normalen Pflegegrad (SGB XI) hinausgehen:

1. **SGB XII Hilfe zur Pflege** – für Menschen >67 Jahre
2. **SGB IX Eingliederungshilfe** – für Menschen <67 Jahre
3. **Persönliches Budget** – flexiblere Mittelverwendung

### Mission
> "Wir ermöglichen Menschen mit Pflege- und Assistenzbedarf ihr Leben nach eigenen Vorstellungen zu gestalten und zu finanzieren."

### Das Problem, das Decari löst
Die "Lücke zwischen gesetzlichem Anspruch und realer Bewilligung" – viele Pflegebedürftige haben Anspruch auf deutlich mehr Leistungen als sie erhalten, aber:
- Antragsprozesse sind extrem komplex (47-seitige Formulare)
- Pflegedienste haben keine Kapazität für Antragsmanagement
- Familien fehlt das Expertenwissen

### Was Decari komplett übernimmt
- Erstkontakt & Beratung der Klienten
- Bedarfsermittlung & Datenmodellierung
- Alle Formulare und Dokumentation
- Komplette Behördenkorrespondenz
- Fristenmanagement
- Widerspruchsverfahren
- Leistungsmonitoring
- Folgeanträge

---

## Zielgruppe & Pain Points

### Primär: Ambulante Pflegedienst-Ketten
- Fokus auf größere Ketten (mehr Hebel: ein Pitch → mehrere Standorte)
- Entscheider: Geschäftsführer, Inhaber, Bereichsleiter

### Sekundär: Stationäre Pflegeheime
- Noch in Discovery-Phase
- Ziel: Erste Explorationsgespräche

### Die wahren Pain Points (Research-basiert)

| Pain Point | Statistik |
|------------|-----------|
| **80%** der Pflegedienste mussten Klienten **ablehnen** | ZQP Studie |
| **13%** mussten bestehenden Klienten **kündigen** | ZQP Studie |
| **53%** haben seit >3 Monaten **unbesetzte Stellen** | ZQP Studie |
| Umsatzrendite eingebrochen auf **1-2%** | Care vor9 |
| Fluktuation ambulant: **65%** pro Jahr | BKV Statistik |
| **73%** der Pflegekräfte leiden unter **Zeitdruck** | Carerockets |

**Kern-Erkenntnis:** Das Problem ist NICHT "zu wenig Klienten" – sondern die Unfähigkeit zu wachsen bei gleichzeitig sinkenden Margen.

---

## Wertversprechen für Pflegedienste

### Der Paradigmenwechsel
- **NICHT:** "Mehr Umsatz durch neue Klienten" (können sie oft gar nicht annehmen)
- **SONDERN:** "Mehr Umsatz mit **bestehenden** Klienten – ohne zusätzliches Personal"

### Finanziell
- Bis zu **3x mehr Umsatz** pro Decari-Klient
- **+3.000€/Monat Mehrumsatz** pro High-Value-Client
- Beispielrechnung: 5 Standorte × 10 HV-Clients × 3.000€ = **150.000€/Monat** = **1,8 Mio. €/Jahr**

### Operativ
- Minimaler Eigenaufwand:
  - Onboarding: 2-3h einmalig, dann 1,5h/Monat
  - Qualifizierung: 30 Min/Fall
  - Durchsetzung: 100% Decari
  - Abrechnung: 20 Min/Monat
  - Folgeantrag: 30 Min anlassbezogen
- **Gesamtaufwand: ~1,5h/Monat pro Standort**

### Strategisch
- White-Label: Decari agiert im Namen des Pflegedienstes
- Positionierung als "Experte" für Sozialrecht
- Kundenbindung durch bessere Versorgung

### Mitarbeiterbindung (NEU - wichtiger Benefit!)

**Die Kausalkette:**

Höheres Budget pro Klient (3x mehr) → Längere Einsatzzeiten möglich → Weniger Tourenstopps pro Schicht (8 statt 12) → Weniger Hetze, mehr Zeit für echte Pflege → Zufriedenere Mitarbeiter → Geringere Fluktuation (spart 70.000€/unbesetzte Stelle)

---

## Branding

### Farben
- --color-primary: #000F57 (Navy – Headlines, Primärfarbe)
- --color-accent: #097788 (Teal – Buttons, Akzente)
- --color-accent-light: #0a9db3 (Teal Light – Hover)

### Logo
- Pixelherz in Teal + "decari" Schriftzug in Navy
- Logo-Datei wird bereitgestellt

### Schriftart
- **Inter** (via Google Fonts oder Fontsource)
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Border Radius
- Buttons: 8px
- Cards: 12px
- Inputs: 8px

---

## Tech Stack

### Basis
- **Pure HTML5** – Keine Framework-Abhängigkeiten
- **Tailwind CSS 4 via CDN** – Kein Build-Step erforderlich
- **Vanilla JavaScript** – Für ROI-Rechner und Interaktionen

### Integrationen
- **Cal.com** – Inline-Embed für Terminbuchung
- **Web3Forms** – Kontaktformular Backend (kostenloser Plan reicht)
- **Google Analytics 4** (optional, vorbereiten)

### Deployment
- **Vercel oder Netlify** (beide kostenlos für Static Sites)
- Oder: Jeder einfache Webspace/Hoster (kein Node.js nötig)

---

## Seitenstruktur & Dateistruktur

decari-landing/
├── index.html              # Landing Page (alle 10 Sections)
├── blog/
│   ├── index.html          # Blog-Übersicht
│   ├── sgb-xii-hilfe-zur-pflege.html
│   ├── warum-mehr-klienten-nicht-die-loesung-ist.html
│   └── mitarbeiterbindung-pflege.html
├── impressum.html          # Impressum (Platzhalter)
├── datenschutz.html        # Datenschutz (Platzhalter)
├── css/
│   └── custom.css          # Nur für Animationen (ROI-Rechner etc.)
├── js/
│   └── roi-calculator.js   # ROI-Rechner Logik
└── assets/
    ├── logo.svg            # Decari Logo
    └── favicon.ico         # Favicon

**URLs:**
- / → Landing Page
- /blog/ → Blog-Übersicht
- /blog/sgb-xii-hilfe-zur-pflege.html → Blog-Artikel
- /impressum.html → Impressum
- /datenschutz.html → Datenschutz

---

## Landing Page Sections (in Reihenfolge)

### 1. HERO
**Headline:** "Mehr Umsatz mit Ihren bestehenden Klienten – ohne zusätzliches Personal"

**Subheadline:** "Ihre Klienten haben Anspruch auf Zusatzleistungen, die niemand beantragt. Wir holen dieses Geld – Sie betreuen dieselben Menschen, verdienen aber bis zu 3x mehr."

**Badge:** "+170% Umsatzsteigerung pro High-Value-Klient"

**CTAs:**
- Primary: "Potenzial berechnen" → Scrollt zum Kalkulator
- Secondary: "Erstgespräch vereinbaren" → Cal.com Popup

---

### 2. PROBLEM
**Headline:** "Sie müssen täglich Anfragen ablehnen – dabei liegt Geld auf dem Tisch"

**3 Problem-Cards:**
1. **Wachsen unmöglich** – 80% der Pflegedienste müssen Anfragen ablehnen. Keine Pflegekräfte, kein Wachstum.
2. **Vergütung reicht nicht** – Die Kassen zahlen <30€ für Leistungen, die Sie >45€ kosten. Schwere Fälle sind Minusgeschäft.
3. **Mitarbeiter am Limit** – 12 Einsätze in 8 Stunden. Zeitdruck, Hetze, 65% Fluktuation.

**Statistik-Highlight:**
> "40% Ihrer Klienten haben Anspruch auf Zusatzleistungen – nur 12% erhalten sie. Dieses Geld liegt auf dem Tisch."

---

### 3. SOLUTION
**Headline:** "Mehr verdienen mit denselben Klienten"

**Subheadline:** "Decari erschließt für Ihre bestehenden Klienten zusätzliche Sozialleistungen. Sie brauchen keine neuen Klienten, kein neues Personal – nur die Ansprüche, die bereits existieren."

**3 Wertsäulen-Cards:**
1. **3x mehr pro Klient** – Bis zu +3.000€/Monat Mehrumsatz pro High-Value-Klient, ohne Mehrarbeit
2. **Null Zusatzaufwand** – Nur ~1,5h/Monat Koordination pro Standort, 100% Behördenkram durch uns
3. **Mitarbeiter entlasten** – Höhere Budgets = längere Einsätze = weniger Hetze = zufriedenere Teams

---

### 4. ROI-RECHNER (Interaktiv)
**Headline:** "Wie viel Umsatz verschenken Sie – bei Ihren bestehenden Klienten?"

**Subheadline:** "3 Eingaben – Ihr Ergebnis in Sekunden"

**Eingaben:**
- Wie viele Klienten betreuen Sie insgesamt? (Slider: 50-1000, Default: 200)
- Durchschnittlicher Pflegegrad Ihrer Klienten (Dropdown: 2-5, Default: 3)
- Wie viele Ihrer Klienten sind >67 Jahre? (Slider: 30-90%, Default: 60%)

**Berechnungsformel (JavaScript):**
const hvKlienten = Math.round(gesamtKlienten * (anteil67plus / 100) * 0.15);
const monatlich = hvKlienten * 3000;
const jaehrlich = monatlich * 12;

**Output (animiert):**
- Anzahl Klienten mit ungenutztem Anspruch
- Monatliches Zusatzpotenzial (€)
- Jährliches Zusatzpotenzial (€)

**Wichtiger Hinweis:**
> Das Beste: Sie brauchen dafür KEINE neuen Mitarbeiter. Diese Klienten betreuen Sie bereits.

**CTA nach Berechnung:** "Potenzial validieren lassen" → Cal.com

**Siehe:** ROI_CALCULATOR_SPEC.md für detaillierte technische Spezifikation

---

### 5. PROZESS
**Headline:** "So einfach funktioniert's"

**5-Schritte Timeline:**
1. **Onboarding** – 2-3h einmalig, Setup & Schulung
2. **Qualifizierung** – 30 Min/Fall, Scoring der Klienten
3. **Durchsetzung** – 100% Decari, Anträge & Behörden
4. **Abrechnung** – 20 Min/Monat, Dokumentation
5. **Folgeanträge** – 30 Min/Fall, Verlängerungen

**Highlight:** "Ihr Gesamtaufwand: ~1,5 Stunden pro Monat und Standort"

---

### 6. FALLBEISPIEL
**Headline:** "Aus der Praxis: Familie Müller"

**Vorher/Nachher Vergleich:**
- **Vorher:** Pflegegrad 4, 1.778€/Monat, Tochter am Limit, Pflegekraft hetzt durch 15-Min-Einsatz
- **Nachher:** + Hilfe zur Pflege, 4.800€/Monat, 24h-Versorgung gesichert, Pflegekraft hat 45 Min Zeit

**Ergebnis:** +3.022€/Monat = +36.264€/Jahr (+170%)

**Doppelter Gewinn:**
> "Mehr Umsatz für Sie. Mehr Zeit für echte Pflege. Zufriedenere Mitarbeiter."

**Kontext:** Herr Müller, 78, fortgeschrittene Demenz mit Weglauftendenz. Scoring: 12/14 Punkte. Bearbeitungszeit: 8 Wochen.

---

### 7. BENEFITS
**Headline:** "Ihre Vorteile mit Decari"

**6 Benefit Cards (2x3 Grid):**

1. **Mehr Umsatz ohne Mehrarbeit**
   - +3.000€/Monat pro High-Value-Klient
   - Ohne neue Klienten aufzunehmen

2. **White-Label Service**
   - Wir agieren in Ihrem Namen
   - Ihre Marke, unsere Expertise

3. **Skalierbar für Ketten**
   - Ein Vertrag, alle Standorte
   - Zentrale Steuerung, lokale Umsetzung

4. **Mitarbeiter halten (NEU)**
   - Höhere Budgets = längere Einsätze = weniger Hetze
   - Zufriedenere Pflegekräfte, geringere Fluktuation

5. **Kein zusätzliches Personal nötig**
   - Weder für die Anträge (machen wir)
   - Noch für mehr Klienten (betreuen Sie bereits)

6. **Erfolgsbasiert**
   - Wir verdienen nur, wenn Sie verdienen
   - Kein Risiko für Sie

---

### 8. CTA / TERMINBUCHUNG
**Headline:** "Lassen Sie uns über Ihr ungenutztes Potenzial sprechen"

**Subheadline:** "In 30 Minuten analysieren wir gemeinsam, wie viel Umsatz bei Ihren bestehenden Klienten auf dem Tisch liegt – und wie Sie ihn holen."

**Cal.com Inline Embed:**
- Kalender direkt eingebettet
- Event: "Erstgespräch Pflegedienste" (30 Min)
- Farben: Decari Branding

---

### 9. KONTAKTFORMULAR
**Headline:** "Oder schreiben Sie uns"

**Web3Forms Felder:**
- Name (required)
- E-Mail (required)
- Unternehmen/Pflegedienst
- Anzahl Klienten (Dropdown: <100, 100-300, 300-500, 500+)
- Nachricht

**Kontaktdaten:**
- E-Mail: vertrieb@decari.de
- Website: www.decari.de

---

### 10. FOOTER
- Logo + Tagline
- Navigation (Leistungen, Prozess, Vorteile, Blog)
- Rechtliches (Impressum, Datenschutz)
- Copyright

---

## Blog-Artikel (3-5 zum Start)

1. "SGB XII Hilfe zur Pflege: Was Pflegedienste wissen müssen"
2. "Warum mehr Klienten nicht die Lösung ist – und was stattdessen hilft"
3. "Mitarbeiterbindung in der Pflege: Wie höhere Budgets pro Klient helfen"
4. "High-Value-Klienten erkennen: Das Scoring-System"
5. "Die häufigsten Fehler bei SGB XII Anträgen"

---

## Technische Integrationen

### Cal.com Setup (HTML)

<script>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", {origin:"https://cal.com"});
</script>

<div id="cal-embed"></div>
<script>
  Cal("inline", {
    elementOrSelector: "#cal-embed",
    calLink: "decari/erstgespraech",
    config: {
      theme: "light",
      styles: { branding: { brandColor: "#097788" } }
    }
  });
</script>

<button data-cal-link="decari/erstgespraech">Termin buchen</button>

### Web3Forms Setup (HTML)

<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
  <input type="hidden" name="subject" value="Neue Anfrage - Decari Landing Page">
  <input type="hidden" name="from_name" value="Decari Website">
  <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
  <input type="text" name="name" placeholder="Ihr Name" required>
  <input type="email" name="email" placeholder="E-Mail" required>
  <input type="text" name="company" placeholder="Pflegedienst/Unternehmen">
  <select name="klienten">
    <option value="">Anzahl Klienten</option>
    <option value="<100">Unter 100</option>
    <option value="100-300">100-300</option>
    <option value="300-500">300-500</option>
    <option value="500+">Über 500</option>
  </select>
  <textarea name="message" placeholder="Ihre Nachricht"></textarea>
  <button type="submit">Nachricht senden</button>
</form>

---

## HTML Boilerplate mit Tailwind CDN

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Decari – Mehr Umsatz mit bestehenden Klienten</title>
  <meta name="description" content="Decari erschließt für Pflegedienste zusätzliche Sozialleistungen. +3.000€/Monat Mehrumsatz pro High-Value-Klient – ohne zusätzliches Personal.">
  <link rel="icon" href="/assets/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#000F57',
            teal: '#097788',
            'teal-light': '#0a9db3',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          borderRadius: {
            DEFAULT: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
          },
        },
      },
    }
  </script>
  <link rel="stylesheet" href="/css/custom.css">
</head>
<body class="font-sans text-gray-800 bg-white">
  <!-- SECTIONS HIER -->
  <script src="/js/roi-calculator.js"></script>
</body>
</html>

---

## css/custom.css (Animationen)

html {
  scroll-behavior: smooth;
}

.animate-count {
  transition: all 0.5s ease-out;
}

.result-card {
  animation: pulse-subtle 2s infinite;
}

@keyframes pulse-subtle {
  0%, 100% { box-shadow: 0 0 0 0 rgba(9, 119, 136, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(9, 119, 136, 0); }
}

---

## Qualitätskriterien

- 100/100 Lighthouse Performance
- 100/100 Lighthouse Accessibility
- 100/100 Lighthouse SEO
- Mobile-First Responsive Design
- Alle CTAs funktionieren (Cal.com, Form)
- ROI-Rechner funktioniert flüssig
- Blog mit 3 Starter-Artikeln
- Meta Tags & Open Graph korrekt
- Favicon gesetzt

---

## Anweisungen für Claude Code

### Schritt 1: Projekt-Struktur anlegen
mkdir -p decari-landing/{blog,css,js,assets}

### Schritt 2: index.html mit Boilerplate erstellen
- Nutze das HTML Boilerplate oben als Ausgangspunkt
- Füge alle 10 Sections nacheinander hinzu
- Verwende Tailwind-Klassen direkt im HTML

### Schritt 3: ROI-Rechner implementieren
- Siehe ROI_CALCULATOR_SPEC.md für detaillierte Logik
- Vanilla JavaScript in /js/roi-calculator.js

### Schritt 4: Cal.com + Web3Forms integrieren
- Cal.com: Inline-Embed in CTA-Section
- Web3Forms: Formular in Kontakt-Section
- WICHTIG: Access Keys müssen vom User eingetragen werden

### Schritt 5: Blog-Artikel erstellen
- 3 statische HTML-Seiten unter /blog/
- Kopiere Header/Footer aus index.html

### Schritt 6: Responsive Testing
- Mobile-First prüfen
- Alle Breakpoints testen (sm, md, lg, xl)

### Schritt 7: Deployment
- Für Vercel/Netlify: Einfach das Verzeichnis deployen
- Kein Build-Step nötig!

---

## Kontakt für Rückfragen

- E-Mail: vertrieb@decari.de
- Website: www.decari.de
