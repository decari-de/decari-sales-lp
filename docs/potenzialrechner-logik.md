# Potenzialrechner V4 – Vollständige Dokumentation

## Kontext

### Über Decari
Decari ist ein Sozialleistungs-Service für ambulante Pflegedienste. Die Kernthese: **Viele Pflegeklienten haben Anspruch auf zusätzliche Sozialleistungen (SGB XII Hilfe zur Pflege, SGB IX Eingliederungshilfe), aber niemand stellt die Anträge.** Decari übernimmt die komplette Antragstellung und erschließt so zusätzliches Umsatzpotenzial für Pflegedienste.

### Über die Website
Die Landing Page (https://partner.decari.de) richtet sich an Geschäftsführer und Pflegedienstleitungen ambulanter Pflegedienste. Der Potenzialrechner ist das zentrale Conversion-Tool der Seite – er ermöglicht eine schnelle Schätzung des zusätzlichen Umsatzpotenzials basierend auf der individuellen Klientenstruktur.

### Framing der Website
- **Problem:** Pflegedienste haben Margen von 1-2%, Personal am Limit, Wachstum blockiert
- **Insight:** 40% der Klienten haben Anspruch auf Zusatzleistungen – nur 12% erhalten sie
- **Lösung:** Nicht neue Klienten suchen, sondern bestehende Klienten optimieren
- **Differenzierung:** Bestandskunden (Aufdecken ungenutzter Ansprüche) + Neukunden (von Tag 1 optimiert)

---

## Ziel des Potenzialrechners

Berechnung des zusätzlichen Umsatzpotenzials eines ambulanten Pflegedienstes durch Erschließung von Sozialleistungsansprüchen für:
1. **Bestandskunden** – Einmaliges Potenzial durch Analyse und Antragstellung
2. **Neukunden** – Wiederkehrendes Potenzial durch Integration der Beratung ins Onboarding

---

## Eingabeparameter

| Parameter | Typ | Range | Default | Beschreibung |
|-----------|-----|-------|---------|--------------|
| **Gesamtklienten** | Slider | 30–1.000 | 120 | Anzahl aller betreuten Klienten |
| **Bundesland** | Dropdown | 16 Bundesländer | – (Pflichtfeld) | Bestimmt regionale Stundensätze |
| **EGH-Zulassung** | Toggle | Ja/Nein | Nein | Hat der Pflegedienst eine SGB IX Zulassung? |
| **Finanzielle Situation** | Buttons | Wohlhabend/Gemischt/Bescheiden | Gemischt | Proxy für Vermögensanteil <10.000€ |
| **Anteil unter 67 Jahren** | Slider | 0–100% | 15% | Altersverteilung der Klienten |
| **Neukunden pro Monat** | Slider | 0–15 | Churn-basiert | Anzahl neuer Klienten pro Monat |

### Hinweise zu den Parametern

**Bundesland:** Pflichtfeld – ohne Auswahl werden keine Ergebnisse angezeigt. Die Vergütungssätze variieren erheblich zwischen den Bundesländern (z.B. Bayern 67,68€/h vs. Mecklenburg-Vorpommern 36€/h für HzP).

**EGH-Zulassung:** Ohne Zulassung für Eingliederungshilfe (SGB IX) kann der Pflegedienst diese Leistungen nicht abrechnen. Die Zulassung wird beim Bezirk oder Landschaftsverband beantragt.

**Finanzielle Situation:** Hilfe zur Pflege (SGB XII) steht nur Klienten mit begrenztem Vermögen zu (unter ca. 10.000€). Der Parameter ist ein Proxy, da die tatsächliche Vermögenssituation der Klienten nicht bekannt ist.

**Anteil unter 67 Jahren:** Eingliederungshilfe (SGB IX) wird in der Regel nur für Klienten unter 67 Jahren bewilligt. Hilfe zur Pflege (SGB XII) richtet sich überwiegend an Klienten über 67.

**Neukunden pro Monat:** Der Default-Wert wird automatisch aus der Klientenzahl berechnet (2,5% = branchenübliche monatliche Fluktuation von ~30%/Jahr). Der Wert aktualisiert sich bei Änderung der Gesamtklientenzahl.

---

## Konstanten

### Konversionsraten
```
BESTAND_KONVERSION    = 20%    // Erfolgsquote bei Bestandskunden
NEUKUNDEN_KONVERSION  = 50%    // Erfolgsquote bei Neukunden (von Tag 1 optimiert)
```

**Begründung für unterschiedliche Raten:**
- **Bestandskunden (20%):** Konservativ, da "Aufdecken" ungenutzter Ansprüche nötig, Klienten sind nicht daran gewöhnt, Überzeugungsarbeit erforderlich
- **Neukunden (50%):** Beratung ist von Tag 1 ins Onboarding integriert, kein Aufdecken nötig, Familie oft involviert und offen

### Churn-Rate
```
DEFAULT_CHURN_MONATLICH = 2,5%   // ~30% jährliche Fluktuation
```

**Begründung:** Ambulante Pflegeklienten "churnen" durch Tod (50-60% der Abgänge), Heimeinweisung (25-35%), Wechsel/Sonstiges (10-20%). Bei einer durchschnittlichen Verweildauer von 3-4 Jahren ergibt sich eine jährliche Churn-Rate von 25-33%.

### Stundenkontingente
```
STUNDEN_HZP = 30    // Monatliche Stunden pro HzP-Klient
STUNDEN_EGH = 40    // Monatliche Stunden pro EGH-Klient
```

**Begründung:** Durchschnittliche Stundenvolumina basierend auf Erfahrungswerten. EGH-Klienten haben typischerweise höheren Betreuungsbedarf.

### Vermögensfaktoren
| Finanzielle Situation | Faktor | Interpretation |
|----------------------|--------|----------------|
| Wohlhabend | 15% | Eigenheim, Ersparnisse – wenige unter 10.000€ |
| Gemischt | 30% | Verschiedene Situationen |
| Bescheiden | 45% | Wenig Rücklagen – viele unter 10.000€ |

### Regionale Stundensätze (HzP = Hilfe zur Pflege, EGH = Eingliederungshilfe)

| Bundesland | HzP (SGB XII) | EGH (SGB IX) |
|------------|---------------|--------------|
| Baden-Württemberg | 45,00 € | 32,00 € |
| Bayern | 67,68 € | 31,57 € |
| Berlin | 48,00 € | 33,00 € |
| Brandenburg | 38,00 € | 28,00 € |
| Bremen | 44,00 € | 30,00 € |
| Hamburg | 50,00 € | 34,00 € |
| Hessen | 46,00 € | 30,00 € |
| Mecklenburg-Vorpommern | 36,00 € | 27,00 € |
| Niedersachsen | 42,00 € | 29,00 € |
| Nordrhein-Westfalen | 43,80 € | 30,48 € |
| Rheinland-Pfalz | 43,00 € | 29,00 € |
| Saarland | 42,00 € | 29,00 € |
| Sachsen | 38,00 € | 27,00 € |
| Sachsen-Anhalt | 37,00 € | 27,00 € |
| Schleswig-Holstein | 43,00 € | 30,00 € |
| Thüringen | 37,00 € | 27,00 € |

**Quelle:** Playbook-Annahmen (Januar 2025), teilweise Schätzungen

---

## Berechnungslogik

### 1. BESTANDSKUNDEN (20% Konversion)

Das Bestandspotenzial ist **einmalig erschließbar** – alle bestehenden Klienten werden einmal auf Ansprüche geprüft.

#### Hilfe zur Pflege (SGB XII) – Klienten über 67 Jahre
```
Klienten über 67       = Gesamtklienten × (1 - Anteil unter 67)
Mit niedrigem Vermögen = Klienten über 67 × Vermögensfaktor
HzP-Klienten (Bestand) = Mit niedrigem Vermögen × 20%
HzP-Umsatz (Bestand)   = HzP-Klienten × 30 Stunden × HzP-Stundensatz
```

#### Eingliederungshilfe (SGB IX) – Klienten unter 67 Jahre
```
Klienten unter 67       = Gesamtklienten × Anteil unter 67
EGH-Klienten (Bestand)  = Klienten unter 67 × 20%  [NUR wenn EGH-Zulassung = Ja]
EGH-Umsatz (Bestand)    = EGH-Klienten × 40 Stunden × EGH-Stundensatz
```

#### Bestandspotenzial
```
Bestand monatlich = HzP-Umsatz (Bestand) + EGH-Umsatz (Bestand)
Bestand jährlich  = Bestand monatlich × 12
```

---

### 2. NEUKUNDEN (50% Konversion)

Das Neukundenpotenzial ist **wiederkehrend** – jedes Jahr kommen neue Klienten hinzu, die von Tag 1 optimal betreut werden.

#### Default-Berechnung Neukunden
```
Neukunden pro Monat (Default) = MAX(1, RUNDEN(Gesamtklienten × 2,5%))
Neukunden pro Jahr            = Neukunden pro Monat × 12
```

#### Hilfe zur Pflege (SGB XII) – Neukunden über 67 Jahre
```
Neu über 67             = Neukunden pro Jahr × (1 - Anteil unter 67)
Neu mit niedrigem Verm. = Neu über 67 × Vermögensfaktor
HzP-Klienten (Neu)      = Neu mit niedrigem Vermögen × 50%
HzP-Umsatz (Neu)        = HzP-Klienten (Neu) × 30 Stunden × HzP-Stundensatz
```

#### Eingliederungshilfe (SGB IX) – Neukunden unter 67 Jahre
```
Neu unter 67            = Neukunden pro Jahr × Anteil unter 67
EGH-Klienten (Neu)      = Neu unter 67 × 50%  [NUR wenn EGH-Zulassung = Ja]
EGH-Umsatz (Neu)        = EGH-Klienten (Neu) × 40 Stunden × EGH-Stundensatz
```

#### Neukundenpotenzial
```
Neukunden jährlich = HzP-Umsatz (Neu) + EGH-Umsatz (Neu)
```

---

### 3. GESAMTPOTENZIAL

```
Jahr 1    = Bestand jährlich + (Neukunden jährlich × 0,5)
Ab Jahr 2 = Neukunden jährlich
```

#### Erklärung der Zeiträume

**Jahr 1 – Einmalige Bestandserschließung + anlaufende Neukunden:**
- Das Bestandspotenzial wird im ersten Jahr vollständig erschlossen
- Neukunden kommen über das Jahr verteilt (durchschnittlich halbes Jahr aktiv), daher ×0,5

**Ab Jahr 2 – Nur noch Neukundenpotenzial:**
- Das Bestandspotenzial ist bereits erschlossen ("abgeerntet")
- Es bleibt das wiederkehrende Neukundenpotenzial (jedes Jahr)

---

## Beispielrechnung

### Eingaben
- Gesamtklienten: **120**
- Bundesland: **Bayern** (HzP 67,68€, EGH 31,57€)
- EGH-Zulassung: **Nein**
- Finanzielle Situation: **Gemischt** (30%)
- Anteil unter 67: **15%**
- Neukunden/Monat: **3** (Default bei 120 Klienten: 120 × 2,5% = 3)

### Berechnung Bestandspotenzial

```
Klienten über 67       = 120 × (1 - 0,15) = 120 × 0,85 = 102
Mit niedrigem Vermögen = 102 × 0,30 = 30,6 ≈ 31
HzP-Klienten (Bestand) = 31 × 0,20 = 6,2 ≈ 6
HzP-Umsatz monatlich   = 6 × 30 × 67,68€ = 12.182,40€ ≈ 12.182€

Bestand jährlich       = 12.182€ × 12 = 146.184€
```

*(Keine EGH-Berechnung, da EGH-Zulassung = Nein)*

### Berechnung Neukundenpotenzial

```
Neukunden pro Jahr     = 3 × 12 = 36
Neu über 67            = 36 × 0,85 = 30,6 ≈ 31
Neu mit niedrigem Verm.= 31 × 0,30 = 9,3 ≈ 9
HzP-Klienten (Neu)     = 9 × 0,50 = 4,5 ≈ 5
HzP-Umsatz (Neu)       = 5 × 30 × 67,68€ = 10.152€/Jahr

Neukunden jährlich     = 10.152€
```

### Gesamtergebnis

```
Jahr 1    = 146.184€ + (10.152€ × 0,5) = 146.184€ + 5.076€ = 151.260€
Ab Jahr 2 = 10.152€/Jahr (dauerhaft)

Qualifizierte Klienten:
- 6 Bestandsklienten
- 5 Neukunden/Jahr
```

---

## Darstellung im UI

### Ergebnisanzeige

```
┌─────────────────────────────────────────────────────┐
│  Ihr geschätztes Zusatzpotenzial                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Jahr 1                          151.265 €   │   │
│  │ Bestandserschließung + Neukunden            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Ab Jahr 2                    10.152 € /Jahr │   │
│  │ Dauerhaft durch Neukunden-Optimierung       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  6 Bestandsklienten + 5 Neukunden/Jahr             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Transparenzbox

Die Transparenzbox zeigt den vollständigen Breakdown der Berechnung:

**BESTANDSKUNDEN (JAHR 1)**
- Hilfe zur Pflege (SGB XII):
  - Von 120 Klienten sind ca. 102 über 67 Jahre
  - Davon haben geschätzt 31 ein Vermögen unter 10.000€
  - Bei ca. 6 Klienten stellen wir erfolgreich Anträge (20%)
  - Geschätzter Umsatz: 12.182€/Monat

**NEUKUNDEN (DAUERHAFT AB JAHR 2)**
- Hilfe zur Pflege (SGB XII):
  - Bei 36 Neukunden/Jahr sind ca. 31 über 67 Jahre
  - Davon haben geschätzt 9 ein Vermögen unter 10.000€
  - Bei ca. 5 Neukunden optimieren wir von Tag 1 (50%)
  - Geschätzter Umsatz: 10.152€/Jahr

---

## Annahmen und Begründungen

| Annahme | Wert | Begründung |
|---------|------|------------|
| Bestand-Konversion | 20% | Konservativ – "Aufdecken" ungenutzter Ansprüche nötig, Überzeugungsarbeit |
| Neukunden-Konversion | 50% | Höher – Beratung von Tag 1 integriert, kein Aufdecken nötig |
| Churn-Rate | ~30%/Jahr | Branchenüblich – Tod, Heimeinweisung, Wechsel |
| Vermögensfaktor | 15-45% | Proxy für SGB XII Berechtigung (Vermögen <10.000€) |
| 67-Jahre-Grenze | Fix | EGH primär für jüngere, HzP primär für ältere Klienten |
| 30h/Monat HzP | Durchschnitt | Typischer Stundenumfang Hilfe zur Pflege |
| 40h/Monat EGH | Durchschnitt | Höherer Bedarf bei Eingliederungshilfe |
| Neukunden ×0,5 in Jahr 1 | Anlaufeffekt | Neukunden kommen verteilt übers Jahr |

---

## Limitationen

1. **Keine individuelle Klientenprüfung** – Die Berechnung basiert auf statistischen Durchschnittswerten, nicht auf individueller Analyse

2. **Vermögensfaktor ist Proxy** – Die tatsächliche Vermögenssituation der Klienten ist unbekannt; der Parameter ist eine Schätzung

3. **Regionale Sätze können abweichen** – Die Stundensätze basieren auf Playbook-Annahmen und können von den tatsächlichen Vergütungssätzen abweichen

4. **Keine Berücksichtigung weiterer Leistungen:**
   - Entlastungsbetrag (125€/Monat)
   - Verhinderungspflege
   - Persönliches Budget
   - Pflegegradhöherstufungen (indirekter Effekt auf Sachleistungen)
   - Kurzzeitpflege

5. **Statische Konversionsraten** – Die 20%/50% Konversionsraten sind Annahmen und können je nach Klientenstruktur und Region variieren

6. **Keine Berücksichtigung von Ablehnungsquoten** – Nicht alle Anträge werden bewilligt; die Konversionsrate soll dies implizit abbilden

---

## Technische Implementierung

### Dateien
- `public/js/potenzialrechner.js` – Berechnungslogik (Vanilla JavaScript)
- `src/components/sections/PotenzialRechner.astro` – UI-Komponente (Astro)

### Architektur
- State-basiert mit reaktiven Updates bei Eingabeänderungen
- Debouncing (50ms) zur Performance-Optimierung
- Animierte Zahlen-Übergänge für bessere UX
- Responsive Design für Mobile und Desktop

---

## Changelog

### V4 (Januar 2025)
- Neukunden-Potenzial hinzugefügt (Churn-basierter Slider)
- Zwei Zeiträume (Jahr 1 / Ab Jahr 2)
- Unterschiedliche Konversionsraten (20% Bestand / 50% Neukunden)
- Erweiterte Transparenzbox mit Breakdown für beide Kategorien

### V3 (Januar 2025)
- Fokus auf SGB XII und SGB IX
- Entfernung von Entlastungsbetrag und Verhinderungspflege
- Bundesland-spezifische Stundensätze
- Vermögensfaktor als Proxy

---

## Kontakt

Bei Fragen zur Berechnungslogik: steffen@decari.de
