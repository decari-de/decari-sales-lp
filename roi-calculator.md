# ROI-Rechner "Potenzial-Kalkulator" – Technische Spezifikation

## Version 2.0 (Januar 2025)

**Überarbeitet:** Die Berechnungslogik wurde korrigiert, um das Potenzial für ALLE Altersgruppen korrekt abzubilden (nicht nur >67-Jährige).

---

## Übersicht

Ein interaktives Tool, mit dem Pflegedienst-Inhaber und Geschäftsführer in Sekunden ihr verstecktes Umsatzpotenzial bei **bestehenden Klienten** berechnen können. Das Tool dient als Lead-Qualifizierung und Engagement-Booster.

**Kernbotschaft:** "Wie viel Umsatz verschenken Sie – bei Ihren bestehenden Klienten?"

---

## User Experience Flow

**Eingabe-Bereich:**
1. Wie viele Klienten betreuen Sie insgesamt? [Slider 50-1000, Default: 200]
2. Durchschnittlicher Pflegegrad Ihrer Klienten [Button-Group: 2, 3, 4, 5 - Default: 3]

**Ergebnis-Bereich (animiert):**
- Anzahl Klienten mit Anspruch: z.B. 14
- Monatliches Potenzial: z.B. 42.000€
- Jährliches Potenzial: z.B. 504.000€

**Hinweis-Box:**
"Das Beste: Sie brauchen dafür KEINE neuen Mitarbeiter. Diese Klienten betreuen Sie bereits."

**CTA-Button:** "Potenzial validieren lassen" → Calendly

**Disclaimer:** "Diese Berechnung basiert auf Durchschnittswerten verschiedener Zusatzleistungen (SGB IX, XII, Verhinderungspflege, Entlastung)."

---

## Eingabefelder im Detail

### Feld 1: Gesamtzahl Klienten

- **Label:** "Wie viele Klienten betreuen Sie insgesamt?"
- **Typ:** Range Slider
- **Min:** 50
- **Max:** 1000
- **Default:** 200
- **Step:** 10

### Feld 2: Durchschnittlicher Pflegegrad

- **Label:** "Durchschnittlicher Pflegegrad Ihrer Klienten"
- **Typ:** Button-Group (Single Select)
- **Optionen:** 2, 3, 4, 5
- **Default:** 3
- **Einfluss:** Bestimmt den Anteil der Klienten mit PG2+ (für Verhinderungspflege)

---

## Berechnungslogik V2.0

### Hintergrund der Änderung

Die ursprüngliche Logik (V1) hatte folgende Probleme:
1. **Ignorierte <67-Jährige:** Eingliederungshilfe (SGB IX) ist oft höher als SGB XII
2. **Unrealistische Konversionsrate:** 15% war zu hoch (real: ~2-4%)
3. **Pflegegrad ungenutzt:** Obwohl im UI, wurde er nicht verwendet

### Decari's Leistungsspektrum

| Leistung | Zielgruppe | Durchschnittlicher Mehrumsatz |
|----------|------------|-------------------------------|
| Eingliederungshilfe (SGB IX) | <67 Jahre mit Behinderung | ~2.000€/Monat |
| Hilfe zur Pflege (SGB XII) | >67 Jahre mit geringem Einkommen | ~1.500€/Monat |
| Verhinderungspflege | Alle PG2+ | ~295€/Monat (3.539€/Jahr) |
| Entlastungsbetrag | Alle PG1+ | 131€/Monat |

### Konstanten (recherchiert)

```javascript
// Konversionsraten (basierend auf Destatis 2024)
const KONVERSIONSRATEN = {
  eingliederungshilfe: 0.03,  // 3% der Klienten
  hilfePflege: 0.04,          // 4% der Klienten
  verhinderungspflege: 0.20,  // 20% nutzen Budget nicht voll aus
  entlastungsbetrag: 0.30     // 30% nutzen nicht voll aus
};

// Mehrumsatz pro Leistungsart (€/Monat)
const MEHRUMSATZ = {
  eingliederungshilfe: 2000,
  hilfePflege: 1500,
  verhinderungspflege: 295,
  entlastungsbetrag: 131
};

// Anteil Klienten mit PG 2+ nach durchschnittlichem Pflegegrad
const ANTEIL_PG2_PLUS = {
  2: 0.70,
  3: 0.85,
  4: 0.95,
  5: 1.00
};
```

### Kernformel (JavaScript)

```javascript
function calculate(gesamtKlienten, pflegegrad) {
  const anteilPG2plus = ANTEIL_PG2_PLUS[pflegegrad] || 0.85;
  const klientenPG2plus = gesamtKlienten * anteilPG2plus;
  
  // Potenzial pro Leistungsart
  const eingliederung = gesamtKlienten * 0.03 * 2000;
  const hilfePflege = gesamtKlienten * 0.04 * 1500;
  const verhinderung = klientenPG2plus * 0.20 * 295;
  const entlastung = gesamtKlienten * 0.30 * 131;
  
  const monatlich = eingliederung + hilfePflege + verhinderung + entlastung;
  
  return {
    hvKlienten: Math.round(gesamtKlienten * 0.07), // ~7% High-Value (SGB IX + XII)
    monatlich: monatlich,
    jaehrlich: monatlich * 12
  };
}
```

### Beispielrechnung (200 Klienten, PG 3)

| Leistungsart | Anteil | Klienten | Mehrumsatz/Monat | Potenzial |
|--------------|--------|----------|------------------|-----------|
| Eingliederungshilfe (SGB IX) | 3% | 6 | 2.000€ | 12.000€ |
| Hilfe zur Pflege (SGB XII) | 4% | 8 | 1.500€ | 12.000€ |
| Verhinderungspflege | 20% von 170 | 34 | 295€ | 10.030€ |
| Entlastungsbetrag | 30% | 60 | 131€ | 7.860€ |
| **Gesamt monatlich** | | | | **~41.890€** |
| **Gesamt jährlich** | | | | **~502.680€** |

**High-Value-Klienten:** 14 (6 SGB IX + 8 SGB XII)

---

## Datenquellen

Die Konstanten basieren auf:

- **Destatis 2024:** Eingliederungshilfe - 1.029.000 Empfänger, 28,7 Mrd. € (~2.324€/Monat durchschnittlich)
- **Destatis 2024:** Hilfe zur Pflege - 432.000 Empfänger, davon 82.000 ambulant (~2-3% aller Pflegebedürftigen)
- **BMG 2025:** Verhinderungspflege 3.539€/Jahr, Entlastungsbetrag 131€/Monat
- **Häusliche Pflege:** Durchschnittlicher Umsatz pro Klient 1.200-1.400€/Monat

---

## Kontext-Fakten

Der Calculator zeigt rotierend einen von mehreren kontextuellen Fakten:

1. **Pflegekräfte:** "Das entspricht X Vollzeit-Pflegekräften, die Sie zusätzlich finanzieren könnten."
2. **Gehaltserhöhungen:** "Das ist genug, um X Mitarbeitern eine Gehaltserhöhung von 500€/Monat zu finanzieren."
3. **Umsatzsteigerung:** "Das entspricht einer Umsatzsteigerung von X% – ohne einen einzigen neuen Klienten."
4. **High-Value-Klienten:** "Ihre X High-Value-Klienten bringen durchschnittlich Y€ Mehrumsatz pro Monat."

---

## UI-Änderungen gegenüber V1

| Element | V1 | V2 |
|---------|-----|-----|
| Eingabefelder | 3 (Klienten, Pflegegrad, Anteil >67) | 2 (Klienten, Pflegegrad) |
| Subheadline | "3 Eingaben – Ihr Ergebnis in Sekunden" | "2 Eingaben – Ihr Ergebnis in Sekunden" |
| Disclaimer | "Ø 3.000€ Mehrumsatz pro HV-Klient" | "verschiedener Zusatzleistungen (SGB IX, XII, ...)" |

---

## Dateien

- **JavaScript:** `/js/roi-calculator.js`
- **HTML:** `/index.html` (Section 4: ROI Calculator)
- **Spec:** `/roi-calculator.md` (diese Datei)
