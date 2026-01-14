# Decari Landing Page – Vollständige Outline

## Projekt-Übersicht

**Ziel:** Conversion-optimierte Landing Page für Decari, die Pflegedienst-Ketten und Heime dazu bringt, einen Termin zu buchen oder Kontakt aufzunehmen.

**Kernbotschaft:** Mehr Umsatz mit bestehenden Klienten – ohne zusätzliches Personal.

**Tech Stack:**
- **Pure HTML5** (kein Framework – maximale Claude-Kompatibilität)
- **Tailwind CSS 4 via CDN** (kein Build-Step)
- **Vanilla JavaScript** für ROI-Rechner
- Cal.com für Terminbuchung
- Web3Forms für Kontaktformular

---

## Seitenstruktur

/                     → Landing Page (Hauptseite)
/blog                 → Blog-Übersicht
/blog/[slug]          → Einzelne Blog-Artikel
/impressum            → Impressum
/datenschutz          → Datenschutz

---

## Landing Page Sections

### 1. HERO SECTION
**Ziel:** Sofort Aufmerksamkeit, Paradigmenwechsel kommunizieren

**Headline:**
> "Mehr Umsatz mit Ihren bestehenden Klienten – ohne zusätzliches Personal"

**Subheadline:**
> "Ihre Klienten haben Anspruch auf Zusatzleistungen, die niemand beantragt. Wir holen dieses Geld – Sie betreuen dieselben Menschen, verdienen aber bis zu 3x mehr."

**Key Metric Badge:**
> "+170% Umsatzsteigerung pro High-Value-Klient"

**CTAs:**
- Primary: "Potenzial berechnen" → Scrollt zum Kalkulator
- Secondary: "Erstgespräch vereinbaren" → Cal.com Popup

**Visual:**
- Abstrakte Darstellung von "ungenutztes Potenzial aufdecken"
- Alternativ: Stilisiertes Pixelherz-Logo groß im Hintergrund

---

### 2. PROBLEM SECTION
**Ziel:** Die wahren Pain Points ansprechen (Research-basiert)

**Headline:**
> "Sie müssen täglich Anfragen ablehnen – dabei liegt Geld auf dem Tisch"

**3 Problem-Cards:**

| Problem | Beschreibung | Statistik |
|---------|--------------|-----------|
| **Wachsen unmöglich** | Sie möchten wachsen, aber ohne Pflegekräfte geht nichts. Neue Klienten aufnehmen? Unmöglich. | 80% der Pflegedienste mussten Anfragen ablehnen |
| **Vergütung reicht nicht** | Die Kassen zahlen <30€ für Leistungen, die Sie >45€ kosten. Schwere Pflegefälle sind ein Minusgeschäft. | Umsatzrendite auf 1-2% eingebrochen |
| **Mitarbeiter am Limit** | 12 Einsätze in 8 Stunden. Zeitdruck, Hetze, keine Zeit für echte Pflege. Kein Wunder, dass alle kündigen. | 65% Fluktuation, 73% leiden unter Zeitdruck |

**Statistik-Highlight:**
> "40% Ihrer Klienten haben Anspruch auf Zusatzleistungen – nur 12% erhalten sie. Dieses Geld liegt auf dem Tisch."

---

### 3. SOLUTION SECTION
**Ziel:** Decari als Lösung positionieren – Fokus auf bestehende Klienten

**Headline:**
> "Mehr verdienen mit denselben Klienten"

**Subheadline:**
> "Decari erschließt für Ihre bestehenden Klienten zusätzliche Sozialleistungen. Sie brauchen keine neuen Klienten, kein neues Personal – nur die Ansprüche, die bereits existieren."

**3 Wertsäulen (Cards):**

1. **3x mehr pro Klient**
   - Bis zu +3.000€/Monat Mehrumsatz pro High-Value-Klient
   - Erschließung von SGB XII, SGB IX, Persönliches Budget
   - Ohne Mehrarbeit für Sie

2. **Null Zusatzaufwand**
   - Nur ~1,5h/Monat Koordination pro Standort
   - 100% Behördenkram durch Decari
   - Weder neue Mitarbeiter noch Schulungen nötig

3. **Mitarbeiter entlasten**
   - Höhere Budgets = längere Einsatzzeiten möglich
   - Weniger Tourenstopps pro Schicht (8 statt 12)
   - Zufriedenere Teams, geringere Fluktuation

---

### 4. INTERAKTIVER ROI-RECHNER
**Ziel:** Engagement erhöhen, individuelles Potenzial aufzeigen, Fokus auf bestehende Klienten

**Headline:**
> "Wie viel Umsatz verschenken Sie – bei Ihren bestehenden Klienten?"

**Subheadline:**
> "3 Eingaben – Ihr Ergebnis in Sekunden"

**Eingabefelder:**

| Feld | Typ | Optionen/Range | Default |
|------|-----|----------------|---------|
| Gesamtzahl Klienten | Slider/Number | 50-1000 | 200 |
| Durchschnittlicher Pflegegrad | Dropdown | 2, 3, 4, 5 | 3 |
| Anteil Klienten >67 Jahre | Slider | 30-90% | 60% |

**Berechnung (JavaScript):**
const hvKlienten = Math.round(gesamtKlienten * (anteil67plus / 100) * 0.15);
const monatlichesPotenzial = hvKlienten * 3000;
const jaehrlichesPotenzial = monatlichesPotenzial * 12;

**Ergebnis-Anzeige (animiert):**
- Anzahl Klienten mit Anspruch (z.B. 18)
- Monatliches Potenzial (z.B. 54.000€)
- Jährliches Potenzial (z.B. 648.000€)

**Wichtiger Hinweis:**
> "Das Beste: Sie brauchen dafür KEINE neuen Mitarbeiter. Diese Klienten betreuen Sie bereits."

**Kontext-Facts (wechselnd):**
- "Das entspricht einer Umsatzsteigerung von X% – ohne einen einzigen neuen Klienten."
- "Mit diesem Budget könnten Ihre Pflegekräfte durchschnittlich X Minuten länger pro Klient verbringen."
- "Das ist genug, um X Mitarbeitern eine Gehaltserhöhung von 500€/Monat zu finanzieren."

**Disclaimer (klein):**
> "Diese Berechnung basiert auf Durchschnittswerten (Ø 3.000€/HV-Klient). Im Erstgespräch analysieren wir Ihr individuelles Potenzial."

---

### 5. PROZESS SECTION
**Ziel:** Transparenz schaffen, Einfachheit demonstrieren

**Headline:**
> "So einfach funktioniert's"

**5-Schritte Timeline (horizontal auf Desktop, vertikal auf Mobile):**

1. Onboarding - 2-3h einmalig - Setup & Schulung
2. Qualifizierung - 30 Min/Fall - Scoring der Klienten
3. Durchsetzung - 100% Decari - Anträge & Behörden
4. Abrechnung - 20 Min/Monat - Dokumentation
5. Folgeanträge - 30 Min/Fall - Verlängerungen

**Highlight:**
> "Ihr Gesamtaufwand: ~1,5 Stunden pro Monat und Standort"

---

### 6. FALLBEISPIEL SECTION
**Ziel:** Konkret machen, doppelten Gewinn zeigen (Umsatz + Mitarbeiter)

**Headline:**
> "Aus der Praxis: Familie Müller"

**Layout: Vorher/Nachher Vergleich**

VORHER:
- Nur Pflegegrad 4
- 1.778€/Monat Sachleistung
- Tochter am Limit
- Pflegekraft: 15-Min-Einsatz

NACHHER:
- + Hilfe zur Pflege
- 4.800€/Monat Gesamtbudget
- 24h-Versorgung gesichert
- Pflegekraft: 45 Min Zeit

**Ergebnis:** +3.022€/Monat = +36.264€/Jahr (+170%)

**Doppelter Gewinn:**
> "Mehr Umsatz für Sie. Mehr Zeit für echte Pflege. Zufriedenere Mitarbeiter."

**Kontext-Box:**
> "Herr Müller, 78, fortgeschrittene Demenz mit Weglauftendenz. Scoring: 12/14 Punkte (High-Value). Bearbeitungszeit bis Bewilligung: 8 Wochen."

---

### 7. BENEFITS SECTION
**Ziel:** Alle Vorteile auf einen Blick – inkl. Mitarbeiterbindung

**Headline:**
> "Ihre Vorteile mit Decari"

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

4. **Mitarbeiter halten**
   - Höhere Budgets = längere Einsätze = weniger Hetze
   - Zufriedenere Pflegekräfte, geringere Fluktuation (spart 70.000€/Stelle)

5. **Kein zusätzliches Personal nötig**
   - Weder für die Anträge (machen wir)
   - Noch für mehr Klienten (betreuen Sie bereits)

6. **Erfolgsbasiert**
   - Wir verdienen nur, wenn Sie verdienen
   - Kein Risiko für Sie

---

### 8. CTA SECTION (Terminbuchung)
**Ziel:** Conversion – Termin buchen

**Headline:**
> "Lassen Sie uns über Ihr ungenutztes Potenzial sprechen"

**Subheadline:**
> "In 30 Minuten analysieren wir gemeinsam, wie viel Umsatz bei Ihren bestehenden Klienten auf dem Tisch liegt – und wie Sie ihn holen."

**Cal.com Inline Embed:**
- Kalender-Widget direkt eingebettet
- Eventtyp: "Erstgespräch Pflegedienste" (30 Min)
- Farben angepasst auf Decari Branding

**Alternativ-CTA:**
> "Lieber erst schriftlich? → Kontaktformular"

---

### 9. KONTAKT SECTION
**Ziel:** Alternative für Nicht-Bucher

**Headline:**
> "Oder schreiben Sie uns"

**Web3Forms Formular:**
- Name (required)
- E-Mail (required)
- Unternehmen/Pflegedienst
- Anzahl Klienten (Dropdown: <100, 100-300, 300-500, 500+)
- Nachricht (Textarea)
- Submit: "Nachricht senden"

**Kontaktdaten daneben:**
- E-Mail: vertrieb@decari.de
- Website: www.decari.de

---

### 10. FOOTER
**Standard Footer mit:**
- Logo + Tagline
- Navigation Links
- Rechtliches (Impressum, Datenschutz)
- Social Links (optional)
- Copyright

---

## Blog-Konzept

### Zweck:
- SEO für relevante Keywords
- Thought Leadership
- Nurturing für noch nicht conversion-bereite Leads

### Beispiel-Artikel (3-5 zum Start):

1. **"SGB XII Hilfe zur Pflege: Was Pflegedienste wissen müssen"**
   - Keyword: "Hilfe zur Pflege Pflegedienst"
   - Erklärt die Basics, positioniert Decari als Experte

2. **"Warum mehr Klienten nicht die Lösung ist – und was stattdessen hilft"**
   - Keyword: "Pflegedienst Umsatz steigern"
   - Paradigmenwechsel-Artikel

3. **"Mitarbeiterbindung in der Pflege: Wie höhere Budgets pro Klient helfen"**
   - Keyword: "Mitarbeiterbindung Pflege"
   - Verbindet Umsatz mit Mitarbeiterzufriedenheit

4. **"High-Value-Klienten erkennen: Das Scoring-System"**
   - Keyword: "Pflegedienst Controlling"
   - Gibt Einblick in die Methodik

5. **"Die häufigsten Fehler bei SGB XII Anträgen (und wie man sie vermeidet)"**
   - Keyword: "SGB XII Antrag"
   - Problem-Lösung-Format

---

## Design-Notizen

### Farben
--primary: #000F57      (Navy – Headlines, CTAs)
--accent: #097788       (Teal – Buttons, Highlights)
--accent-light: #0a9db3 (Teal Light – Hover States)
--bg-light: #f7fafc     (Light Gray – Alt Sections)

### Typography
- Headlines: Inter Bold, Navy
- Body: Inter Regular, Dark Gray
- Akzente: Inter Semibold, Teal

### Radius
- Buttons: 8px
- Cards: 12px
- Inputs: 8px

### Spacing
- Section Padding: 80px (Desktop), 48px (Mobile)
- Container Max-Width: 1200px

---

## Analytics & Tracking

### Events zu tracken:
1. page_view – Landing Page aufgerufen
2. calculator_interaction – Rechner benutzt
3. calculator_result_shown – Ergebnis angezeigt
4. cta_click_calendar – Kalender-CTA geklickt
5. booking_started – Cal.com geöffnet
6. booking_completed – Termin gebucht (Cal.com Webhook)
7. form_submitted – Kontaktformular abgeschickt
8. blog_article_read – Blog-Artikel gelesen

---

## Mobile Optimierung

- Hero: Single Column, kleinere Headlines
- ROI Calculator: Full-Width Sliders
- Prozess: Vertical Timeline
- Benefits: 1 Column Stack
- Cal.com: Full-Width Embed
- Sticky Mobile CTA Bar am Bottom (optional)

---

## Next Steps für Claude Code

1. **Projekt-Struktur anlegen** (mkdir für blog, css, js, assets)
2. **index.html erstellen** mit Tailwind CDN Boilerplate
3. **Alle 10 Sections implementieren** (Hero → Footer)
4. **ROI Calculator implementieren** (Vanilla JS)
5. **Cal.com + Web3Forms integrieren**
6. **3 Blog-Artikel als statische HTML-Seiten**
7. **Responsive Testing** (Mobile-First)
8. **Performance Check** (Lighthouse)
9. **Deployment** auf Vercel/Netlify (oder beliebiger Hoster)

**Vorteile dieses Setups:**
- Kein Build-Step, keine npm-Abhängigkeiten
- Claude Code kann direkt HTML schreiben
- Sofort deployfähig auf jedem Webspace
- Maximale Kontrolle, keine Framework-Abstraktionen
