# Prompt: Potenzialrechner V7 – Grundlegende Überarbeitung

## Kontext

Du arbeitest an der Decari Sales Landing Page (partner.decari.de). Decari hilft ambulanten Pflegediensten, Sozialleistungsansprüche ihrer Klienten zu identifizieren und durchzusetzen – primär **Hilfe zur Pflege (SGB XII)** und **Eingliederungshilfe (SGB IX)**.

Der "Potenzialrechner" soll Pflegedienstleitern zeigen, wie viel zusätzlichen Umsatz sie durch Decari generieren könnten. **Problem:** Der aktuelle Rechner ist zu komplex, hat Logikinkonsistenzen und bietet eine verwirrende Nutzererfahrung.

---

## Aktuelle Implementierung

**Dateien:**
- `public/js/potenzialrechner.js` – Berechnungslogik (Vanilla JS)
- `src/components/sections/PotenzialRechner.astro` – UI-Komponente

**Aktuelle Eingaben (6 Felder):**
1. Gesamtklienten (Slider: 30–1000)
2. Bundesland (Dropdown)
3. EGH-Zulassung (Ja/Nein)
4. Finanzielle Situation (Wohlhabend/Gemischt/Bescheiden)
5. Anteil unter 67 Jahren (Slider: 0–100%)
6. Neukunden pro Monat (Slider: 0–15)

**Aktuelle Ausgaben:**
- Bestand monatlich (ca. X €)
- Neukunden monatlich (ca. X €)
- Gesamtpotenzial monatlich
- 3-Jahres-Projektion
- Klienten-Zusammenfassung ("X Bestandsklienten + Y Neukunden/Jahr mit Potenzial")

---

## Identifizierte Probleme

### 1. Inkonsistente Konversionsraten

```javascript
const BESTAND_KONVERSION = 0.20;  // 20% bei Bestandskunden
const NEUKUNDEN_KONVERSION = 0.50; // 50% bei Neukunden
```

**Problem:** Warum sollten Neukunden 2,5× höhere Erfolgsquote haben?

- Die demografischen Faktoren (Alter, Vermögen) sind identisch
- Der einzige Unterschied ist der Zeitpunkt der Prüfung
- Die 50% suggerieren unrealistisch hohe Erfolgsquoten

**Eigentliche Logik sollte sein:**
- Bestand: Wir prüfen bestehende Klienten → X% haben Anspruch
- Neukunden: Bei Aufnahme prüfen wir sofort → Dieselben X% haben Anspruch
- Der Unterschied ist nicht die Erfolgsquote, sondern dass Neukunden kontinuierlich dazukommen

### 2. Verwirrende Klienten-Anzeige

**Nutzer-Eingabe:** 3 Neukunden/Monat (= 36/Jahr)
**Angezeigte Ausgabe:** "8 Neukunden/Jahr mit Potenzial"

**Nutzer-Reaktion:** "Woher kommen die 5 zusätzlichen Neukunden?"

**Ursache:** Die Anzeige zeigt das Ergebnis einer komplexen Filterkette:
```
36 Neukunden/Jahr
  → 85% über 67 = 31
  → 30% niedriges Vermögen = 9
  → 50% Konversion = 5 (HzP)
  → + 3 (EGH) = 8 "mit Potenzial"
```

Diese Logik ist für Nutzer nicht nachvollziehbar und wirkt willkürlich.

### 3. Eingabefelder – Was bleibt, was geht?

| Eingabe | Status | Begründung |
|---------|--------|------------|
| Gesamtklienten | ✓ Behalten | Kernmetrik |
| Bundesland | ✓ Behalten | Stundensätze variieren stark |
| EGH-Zulassung | ✓ Behalten | Wichtig für EGH-Potenzial |
| Finanzielle Situation | ✓ Behalten | Kernfaktor für HzP-Anspruch |
| Anteil unter 67 | ✓ Behalten | Trennt HzP/EGH-Zielgruppe |
| Neukunden/Monat | ✗ Entfernen | Verwirrt mehr als es hilft, Logik inkonsistent |

**Ergebnis:** 5 Eingaben behalten, Neukunden-Slider entfernen.

**Wichtig:** Die Eingaben dienen auch intern als **Lead-Priorisierung**. Mehr Eingaben = individuellere Ergebnisse = bessere Qualifizierung. Wir brauchen ein gesundes Gleichgewicht zwischen Einfachheit und Aussagekraft.

### 4. Undurchsichtige Berechnung

Die aktuelle Formel:
```
Umsatz = Klienten × Altersfilter × Vermögensfilter × Konversionsrate × Stunden × Stundensatz
```

Das sind 6 Multiplikationen mit teilweise geschätzten Faktoren. Der Nutzer kann nicht nachvollziehen, wie das Ergebnis zustande kommt.

### 5. Fragwürdige Annahmen

| Annahme | Wert | Quelle |
|---------|------|--------|
| Monatliche Stunden HzP | 30h | Playbook-Schätzung |
| Monatliche Stunden EGH | 40h | Playbook-Schätzung |
| Vermögen "gemischt" | 30% | Grobe Schätzung |
| Bestand-Konversion | 20% | Unbekannt |
| Neukunden-Konversion | 50% | Unbekannt |

Diese Zahlen klingen präzise, sind aber Schätzungen. Die Scheingenauigkeit untergräbt Glaubwürdigkeit.

---

## Ziele der Überarbeitung

### Primäre Ziele

1. **Verständlichkeit:** Nutzer soll nachvollziehen können, wie das Ergebnis entsteht
2. **Konsistenz:** Eine einheitliche Logik für Bestand und Neukunden
3. **Einfachheit:** Weniger Eingaben, klarere Ausgaben
4. **Glaubwürdigkeit:** Keine Scheingenauigkeit, ehrliche Schätzungen

### Sekundäre Ziele

5. **Conversion:** Der Rechner soll zum Erstgespräch motivieren
6. **Mobile-First:** Funktioniert gut auf Smartphones
7. **Schnelligkeit:** Ergebnis in <10 Sekunden

---

## Lösungsvorschläge zur Diskussion

### Option A: Neukunden entfernen, Logik vereinheitlichen (EMPFOHLEN)

**Eingaben (5 statt 6):**
1. Gesamtklienten
2. Bundesland
3. EGH-Zulassung
4. Finanzielle Situation
5. Anteil unter 67 Jahren

**Entfernt:** Neukunden-Slider (Hauptquelle der Verwirrung)

**Logik-Änderungen:**
- Eine einheitliche Konversionsrate (z.B. 20-25%)
- Fokus auf **monatliches Bestandspotenzial**
- Optional: Hochrechnung auf Jahr/3 Jahre als sekundäre Info

**Ausgabe vereinfachen:**
```
┌─────────────────────────────────────────────┐
│  Ihr monatliches Potenzial: ca. 12.200 €   │
│  ─────────────────────────────────────────  │
│  Bei X von Y Klienten mit Anspruch         │
│  (HzP: A Klienten, EGH: B Klienten)        │
└─────────────────────────────────────────────┘
```

**Vorteile:**
- Keine verwirrende Neukunden-Logik mehr
- Nutzer versteht: "Von meinen 120 Klienten haben 6 Anspruch"
- Individuell durch 5 Eingaben, aber nachvollziehbar

### Option B: Klienten-Fokus statt Umsatz-Fokus

**Statt:** "Sie können 22.000€/Monat mehr verdienen"
**Zeigen:** "Bei 120 Klienten haben ca. 6–10 Anspruch auf Sozialleistungen"

**Dann:** Umsatz als sekundäre Info, nicht als Hauptmetrik

**Vorteil:** Weniger "Verkäufer-Gefühl", mehr Beratungs-Charakter

### Option C: Benchmark-Ansatz (Zukunft)

**Statt komplexer Berechnung:**
"Pflegedienste Ihrer Größe in Bayern erschließen durchschnittlich X€/Monat"

**Basierend auf:** Echte Decari-Kundendaten (anonymisiert)

**Vorteil:** Glaubwürdiger, weil auf echten Daten basierend

**Status:** Für später, wenn genug Kundendaten vorhanden sind

---

## Technische Constraints

- **Framework:** Astro 5.x (Static Site Generator)
- **Styling:** Tailwind CSS
- **JavaScript:** Vanilla JS (kein Framework)
- **Daten:** Bundesland-spezifische Stundensätze müssen erhalten bleiben

```javascript
const BUNDESLAND_DATA = {
  "Bayern": { hzp: 67.68, egh: 31.57 },
  "Nordrhein-Westfalen": { hzp: 43.8, egh: 30.48 },
  // ... etc.
};
```

---

## Entscheidungen (bereits geklärt)

1. **Eingaben:** 5 Felder behalten (Klienten, Bundesland, EGH, Finanzen, Alter) – dienen auch als Lead-Priorisierung
2. **Neukunden-Slider:** Entfernen – Hauptquelle der Verwirrung
3. **Individualität wichtig:** Mehr Eingaben = bessere Qualifizierung für Vertrieb
4. **Balance:** Gesundes Gleichgewicht zwischen Einfachheit und Aussagekraft

## Offene Fragen

1. **Konversionsrate:** Welcher Wert ist realistisch? (Aktuell 20% Bestand)

2. **Ausgabe-Format:** 
   - Nur monatlich?
   - Monatlich + Jahreshochrechnung?
   - Mit/ohne Klienten-Anzahl?

3. **Transparenz-Box:** Standardmäßig offen oder geschlossen?

---

## Deine Aufgabe

1. **Lies die aktuellen Dateien:**
   - `public/js/potenzialrechner.js`
   - `src/components/sections/PotenzialRechner.astro`

2. **Implementiere Option A:**
   - Entferne den Neukunden-Slider komplett
   - Entferne die 2-Säulen-Struktur (Bestand/Neukunden)
   - Zeige EIN klares Ergebnis: Monatliches Potenzial
   - Zeige nachvollziehbar: "Bei X von Y Klienten"
   - Optional: Jahres-/3-Jahres-Hochrechnung als sekundäre Info

3. **Vereinfache die Ausgabe:**
   - Hauptzahl: Monatliches Potenzial (prominent)
   - Erklärung: Wie viele Klienten haben Anspruch
   - Transparenz-Box: Rechenweg nachvollziehbar

4. **Entferne toten Code:**
   - Alle Neukunden-bezogenen Variablen
   - Die 50% Konversionsrate
   - Die verworrene Klienten-Anzeige

**Priorität:** Verständlichkeit > Einfachheit > Genauigkeit

Der Rechner soll den Nutzer zum Erstgespräch motivieren, nicht eine präzise Finanzprognose liefern. Lieber ehrlich "ca. 10.000–20.000€" als scheingenau "17.342€".

---

## Zusammenfassung der Änderungen

| Vorher | Nachher |
|--------|---------|
| 6 Eingaben | 5 Eingaben (ohne Neukunden) |
| 2 Säulen (Bestand + Neukunden) | 1 klares Ergebnis |
| 2 Konversionsraten (20%/50%) | 1 Konversionsrate (20%) |
| Verwirrende Klienten-Anzeige | Nachvollziehbar: "X von Y Klienten" |
| Monatlich + Jährlich gemischt | Primär monatlich |
