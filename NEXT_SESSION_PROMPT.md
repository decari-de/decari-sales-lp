# Nächste Session: ROI Calculator Überarbeitung

## Kontext

Die Decari Landing Page wurde erstellt, aber der ROI Calculator hat eine **fehlerhafte Logik**. Der Calculator muss überarbeitet werden, um das tatsächliche Geschäftsmodell korrekt abzubilden.

## Das Problem

### Aktuelle (falsche) Logik:
```javascript
// FALSCH: Nur >67-Jährige werden als Potenzial gerechnet
const klienten67plus = gesamtKlienten * (anteil67plus / 100);
const hvKlienten = Math.round(klienten67plus * 0.15);
```

**Fehler:** Wenn der Slider "Anteil >67 Jahre" nach oben geht, steigt das Potenzial. Das ist falsch!

### Warum das falsch ist:

Decari erschließt Leistungen für **BEIDE** Altersgruppen:

| Altersgruppe | Leistungen | Potenzial |
|--------------|------------|-----------|
| **>67 Jahre** | Hilfe zur Pflege (SGB XII), Verhinderungspflege, Entlastungspflege | Hoch |
| **<67 Jahre** | Eingliederungshilfe (SGB IX), Persönliches Budget, Verhinderungspflege, Entlastungspflege | **Oft HÖHER** (bis zu 10.000€+/Monat) |

**Realität:** Je mehr Klienten <67 Jahre, desto MEHR Potenzial (nicht weniger!), weil Eingliederungshilfe oft höhere Beträge bringt.

## Decari's Leistungsspektrum (für Calculator-Logik)

1. **Höherstufung Pflegegrad** - Für alle Altersgruppen
2. **Hilfe zur Pflege (SGB XII)** - Primär für >67 Jahre
3. **Eingliederungshilfe (SGB IX)** - Primär für <67 Jahre (oft höhere Beträge!)
4. **Verhinderungspflege** - Für alle mit Pflegegrad 2+
5. **Entlastungsleistungen** - Für alle Pflegegrade

## Aufgaben für diese Session

### 1. Recherche: Optimaler Calculator
Recherchiere und beantworte:
- Welche Eingabevariablen sind wirklich relevant für die Potenzialberechnung?
- Brauchen wir den durchschnittlichen Pflegegrad überhaupt?
- Wie können wir das Potenzial für beide Altersgruppen korrekt abbilden?
- Was sind realistische Durchschnittswerte pro Leistungsart?

**Recherche-Quellen:**
- SGB XII Hilfe zur Pflege: Durchschnittliche Bewilligungen
- SGB IX Eingliederungshilfe: Durchschnittliche Budgets
- Verhinderungspflege: 1.612€/Jahr (bekannt)
- Entlastungsbetrag: 125€/Monat (bekannt)

### 2. Neues Calculator-Konzept entwerfen

Mögliche neue Eingaben:
- Gesamtzahl Klienten
- Anteil Klienten mit Behinderung/chronischer Erkrankung <67 (für Eingliederungshilfe)
- Anteil Klienten >67 mit geringem Einkommen/Vermögen (für Hilfe zur Pflege)
- Oder: Vereinfachte Version mit nur Gesamtklienten + Altersverteilung

### 3. Implementierung

Nach der Recherche:
- `js/roi-calculator.js` überarbeiten
- `index.html` Section 4 (ROI Calculator) anpassen
- Ggf. `roi-calculator.md` Spezifikation aktualisieren

## Dateien

- **Calculator JS:** `/Users/regstef/Documents/GitHub/decari-sales-lp/js/roi-calculator.js`
- **Landing Page:** `/Users/regstef/Documents/GitHub/decari-sales-lp/index.html` (Section 4)
- **Alte Spec:** `/Users/regstef/Documents/GitHub/decari-sales-lp/roi-calculator.md`
- **Projekt-Kontext:** `/Users/regstef/Documents/GitHub/decari-sales-lp/plan.md`

## Fragen an den Benutzer (bei Bedarf)

1. Wie ist die typische Altersverteilung bei Decari-Klienten?
2. Was ist der durchschnittliche Mehrumsatz pro Klient bei Eingliederungshilfe vs. Hilfe zur Pflege?
3. Soll der Calculator einfach bleiben (wenige Inputs) oder detailliert (mehr Inputs, genauere Ergebnisse)?
4. Gibt es interne Daten zu Konversionsraten pro Leistungsart?

## Erwartetes Ergebnis

Ein überarbeiteter ROI Calculator, der:
- Das Potenzial für ALLE Klienten korrekt berechnet (nicht nur >67)
- Die Eingliederungshilfe für <67-Jährige berücksichtigt
- Realistische Durchschnittswerte verwendet
- Für den Benutzer verständlich und überzeugend ist
