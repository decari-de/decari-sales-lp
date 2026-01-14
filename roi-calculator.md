# ROI-Rechner "Potenzial-Kalkulator" – Technische Spezifikation

## Übersicht

Ein interaktives Tool, mit dem Pflegedienst-Inhaber und Geschäftsführer in Sekunden ihr verstecktes Umsatzpotenzial bei **bestehenden Klienten** berechnen können. Das Tool dient als Lead-Qualifizierung und Engagement-Booster.

**Kernbotschaft:** "Wie viel Umsatz verschenken Sie – bei Ihren bestehenden Klienten?"

---

## User Experience Flow

Eingabe-Bereich:
1. Wie viele Klienten betreuen Sie insgesamt? [Slider 50-1000, Default: 200]
2. Durchschnittlicher Pflegegrad Ihrer Klienten [Button-Group: 2, 3, 4, 5 - Default: 3]
3. Wie viele Ihrer Klienten sind über 67 Jahre? [Slider 30-90%, Default: 60%]
   Info: Diese sind potenzielle SGB XII Kandidaten

Ergebnis-Bereich (animiert einblenden):
- Anzahl Klienten mit Anspruch: z.B. 18
- Monatliches Potenzial: z.B. 54.000€
- Jährliches Potenzial: z.B. 648.000€

Hinweis-Box:
"Das Beste: Sie brauchen dafür KEINE neuen Mitarbeiter. Diese Klienten betreuen Sie bereits."

CTA-Button: "Potenzial validieren lassen" → Cal.com

Disclaimer: "Basierend auf Ø 3.000€ Mehrumsatz pro High-Value-Klient"

---

## Eingabefelder im Detail

### Feld 1: Gesamtzahl Klienten

Label: "Wie viele Klienten betreuen Sie insgesamt?"
Typ: Range Slider + Number Input
Min: 50
Max: 1000
Default: 200
Step: 10
Validierung: Integer, positiv

**UX-Details:**
- Slider zeigt aktuelle Zahl rechts daneben
- Bei Klick auf Zahl: Direkteingabe möglich
- Visuelle Marker bei 100, 250, 500, 750, 1000
- Tooltip: "Alle Klienten über alle Standorte hinweg"

---

### Feld 2: Durchschnittlicher Pflegegrad

Label: "Durchschnittlicher Pflegegrad Ihrer Klienten"
Typ: Button-Group (Single Select)
Optionen: 2, 3, 4, 5
Default: 3

**UX-Details:**
- Horizontale Buttons, einer aktiv (hervorgehoben)
- Tooltip: "Der häufigste Pflegegrad in Ihrem Klientenstamm"
- Höhere Pflegegrade → höheres Potenzial (in Berechnung)

---

### Feld 3: Anteil Klienten >67 Jahre

Label: "Wie viele Ihrer Klienten sind über 67 Jahre?"
Typ: Range Slider
Min: 30%
Max: 90%
Default: 60%
Step: 1%
Validierung: Prozent

**UX-Details:**
- Info-Icon mit Tooltip: "Klienten über 67 Jahre sind potenzielle Kandidaten für SGB XII Hilfe zur Pflege."
- Slider zeigt Prozentwert rechts daneben

---

## Berechnungslogik

### Kernformel (JavaScript)

const calculate = (gesamtKlienten, pflegegrad, anteil67plusProzent) => {
  // Konstanten
  const MEHRUMSATZ_PRO_HV_KLIENT = 3000; // Euro pro Monat
  const MONATE_PRO_JAHR = 12;
  const KONVERSIONSRATE = 0.15; // 15% der >67-Jährigen sind HV-Kandidaten

  // Berechnung
  const klienten67plus = gesamtKlienten * (anteil67plusProzent / 100);
  const hvKlienten = Math.round(klienten67plus * KONVERSIONSRATE);
  const monatlichesPotenzial = hvKlienten * MEHRUMSATZ_PRO_HV_KLIENT;
  const jaehrlichesPotenzial = monatlichesPotenzial * MONATE_PRO_JAHR;

  return {
    hvKlienten,
    monatlichesPotenzial,
    jaehrlichesPotenzial
  };
};

### Beispielrechnung

Eingabe:
- Gesamtklienten: 200
- Pflegegrad: 3
- Anteil >67 Jahre: 60%

Berechnung:
- Klienten >67 Jahre: 200 * 0.60 = 120
- High-Value Kandidaten: 120 * 0.15 = 18
- Monatliches Potenzial: 18 * 3.000€ = 54.000€
- Jährliches Potenzial: 54.000€ * 12 = 648.000€

---

## Zusätzliche Kontextualisierung

const getContextFacts = (jaehrlichesPotenzial, hvKlienten) => {
  const facts = [];
  
  // Fakt 1: Pflegekräfte finanzierbar
  const PFLEGEKRAFT_JAHRESKOSTEN = 72000;
  const finanzierbarePflegekraefte = Math.floor(jaehrlichesPotenzial / PFLEGEKRAFT_JAHRESKOSTEN);
  if (finanzierbarePflegekraefte >= 1) {
    facts.push(`Das entspricht ${finanzierbarePflegekraefte} Vollzeit-Pflegekräften, die Sie zusätzlich finanzieren könnten.`);
  }
  
  // Fakt 2: Gehaltserhöhungen
  const gehaltsErhoehungProMitarbeiter = 500;
  const mitarbeiterMitErhoehung = Math.floor((jaehrlichesPotenzial / 12) / gehaltsErhoehungProMitarbeiter);
  if (mitarbeiterMitErhoehung >= 5) {
    facts.push(`Das ist genug, um ${mitarbeiterMitErhoehung} Mitarbeitern eine Gehaltserhöhung von 500€/Monat zu finanzieren.`);
  }
  
  // Fakt 3: Längere Einsatzzeiten
  const zusatzMinutenProKlient = Math.round((3000 / 50) * 60 / 30); // Grobe Schätzung
  facts.push(`Mit diesem Budget könnten Ihre Pflegekräfte durchschnittlich ${zusatzMinutenProKlient} Minuten länger pro Klient verbringen.`);
  
  return facts;
};

---

## Animation & Interaktion

### Echtzeit-Updates
- Berechnung erfolgt live bei jeder Slider-Bewegung
- Debounce: 50ms (für flüssige UX ohne Performance-Probleme)

### Zahlen-Animation (JavaScript)

const animateNumber = (element, targetValue, duration = 800) => {
  const startValue = parseInt(element.textContent.replace(/\D/g, '')) || 0;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic für natürliche Animation
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(startValue + (targetValue - startValue) * easeProgress);

    element.textContent = formatNumber(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

// Formatierung: 216000 → "216.000€"
const formatNumber = (num, suffix = '€') => {
  return num.toLocaleString('de-DE') + suffix;
};

### Ergebnis-Reveal (CSS)

/* Initial versteckt */
.result-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

/* Nach erster Berechnung */
.result-section.visible {
  opacity: 1;
  transform: translateY(0);
}

---

## Visuelles Design

### Slider Styling (Tailwind + Custom CSS)

HTML:
<input
  type="range"
  id="gesamtKlienten"
  min="50"
  max="1000"
  value="200"
  step="10"
  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-custom"
/>

CSS:
.slider-custom::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #097788;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.slider-custom::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.slider-custom::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #097788;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

### Ergebnis-Karten (HTML mit Tailwind)

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="bg-white rounded-xl p-6 shadow-lg text-center border-t-4 border-teal">
    <div class="text-4xl font-bold text-navy" id="result-hvKlienten">18</div>
    <div class="text-sm text-gray-500 mt-2">Klienten mit Anspruch</div>
  </div>
  <div class="bg-white rounded-xl p-6 shadow-lg text-center border-t-4 border-teal">
    <div class="text-4xl font-bold text-navy" id="result-monatlich">54.000€</div>
    <div class="text-sm text-gray-500 mt-2">pro Monat zusätzlich</div>
  </div>
  <div class="bg-teal/10 rounded-xl p-6 shadow-lg text-center border-2 border-teal">
    <div class="text-4xl font-bold text-navy" id="result-jaehrlich">648.000€</div>
    <div class="text-sm text-gray-600 mt-2 font-medium">pro Jahr zusätzlich</div>
  </div>
</div>

---

## Vollständige HTML-Struktur

<section id="potenzial-rechner" class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
  <div class="container max-w-4xl mx-auto px-6">
    
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">
        Wie viel Umsatz verschenken Sie – bei Ihren bestehenden Klienten?
      </h2>
      <p class="text-gray-600 text-lg">
        3 Eingaben – Ihr Ergebnis in Sekunden
      </p>
    </div>

    <!-- Calculator Card -->
    <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      
      <!-- Eingabefelder -->
      <div class="space-y-8" id="calculator-inputs">
        
        <!-- Feld 1: Gesamtklienten -->
        <div class="calculator-field">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            Wie viele Klienten betreuen Sie insgesamt?
          </label>
          <div class="flex items-center gap-4">
            <input 
              type="range" 
              id="gesamtKlienten" 
              min="50" 
              max="1000" 
              value="200" 
              step="10" 
              class="flex-1 slider-custom"
            />
            <span class="text-2xl font-bold text-navy w-16 text-right" id="display-klienten">200</span>
          </div>
        </div>

        <!-- Feld 2: Pflegegrad -->
        <div class="calculator-field">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            Durchschnittlicher Pflegegrad Ihrer Klienten
          </label>
          <div class="flex gap-2" id="pflegegrad-buttons">
            <button data-value="2" class="px-6 py-3 rounded-lg border-2 border-gray-200 font-semibold transition-all hover:border-teal">2</button>
            <button data-value="3" class="px-6 py-3 rounded-lg border-2 border-teal bg-teal text-white font-semibold">3</button>
            <button data-value="4" class="px-6 py-3 rounded-lg border-2 border-gray-200 font-semibold transition-all hover:border-teal">4</button>
            <button data-value="5" class="px-6 py-3 rounded-lg border-2 border-gray-200 font-semibold transition-all hover:border-teal">5</button>
          </div>
        </div>

        <!-- Feld 3: Anteil >67 Jahre -->
        <div class="calculator-field">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            Wie viele Ihrer Klienten sind über 67 Jahre?
            <span class="ml-2 text-gray-400 text-xs">(potenzielle SGB XII Kandidaten)</span>
          </label>
          <div class="flex items-center gap-4">
            <input 
              type="range" 
              id="anteil67plus" 
              min="30" 
              max="90" 
              value="60" 
              class="flex-1 slider-custom"
            />
            <span class="text-2xl font-bold text-navy w-16 text-right" id="display-anteil">60%</span>
          </div>
        </div>
      </div>

      <!-- Ergebnisse -->
      <div id="calculator-results" class="mt-12 pt-8 border-t border-gray-100 result-section visible">
        
        <h3 class="text-xl font-semibold text-center text-gray-700 mb-6">
          Umsatz, den Sie aktuell verschenken
        </h3>

        <!-- Ergebnis-Karten -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-gray-50 rounded-xl p-6 text-center">
            <div class="text-4xl font-bold text-teal" id="result-hvKlienten">18</div>
            <div class="text-sm text-gray-500 mt-2">Klienten mit Anspruch</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-6 text-center">
            <div class="text-4xl font-bold text-teal" id="result-monatlich">54.000€</div>
            <div class="text-sm text-gray-500 mt-2">pro Monat zusätzlich</div>
          </div>
          <div class="bg-teal/10 rounded-xl p-6 text-center border-2 border-teal">
            <div class="text-4xl font-bold text-navy" id="result-jaehrlich">648.000€</div>
            <div class="text-sm text-gray-600 mt-2 font-medium">pro Jahr zusätzlich</div>
          </div>
        </div>

        <!-- Hinweis-Box -->
        <div class="bg-navy/5 rounded-lg p-4 text-center text-navy mb-8">
          <strong>Das Beste:</strong> Sie brauchen dafür KEINE neuen Mitarbeiter. Diese Klienten betreuen Sie bereits.
        </div>

        <!-- Kontext-Fakt -->
        <div id="context-fact" class="text-center text-gray-600 mb-8">
          Das entspricht <strong>9 Vollzeit-Pflegekräften</strong>, die Sie zusätzlich finanzieren könnten.
        </div>

        <!-- CTA -->
        <div class="text-center">
          <button
            data-cal-link="decari/erstgespraech"
            class="bg-teal text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-teal-light transition-all shadow-lg hover:shadow-xl"
          >
            Potenzial validieren lassen
          </button>
        </div>

        <!-- Disclaimer -->
        <p class="text-xs text-gray-400 text-center mt-6">
          Diese Berechnung basiert auf Durchschnittswerten (Ø 3.000€ Mehrumsatz pro High-Value-Klient).
          Im Erstgespräch analysieren wir Ihr individuelles Potenzial.
        </p>
      </div>
    </div>
  </div>
</section>

---

## Vollständiges JavaScript (roi-calculator.js)

document.addEventListener('DOMContentLoaded', function() {
  
  // Elemente
  const sliderKlienten = document.getElementById('gesamtKlienten');
  const sliderAnteil = document.getElementById('anteil67plus');
  const displayKlienten = document.getElementById('display-klienten');
  const displayAnteil = document.getElementById('display-anteil');
  const pflegegradButtons = document.querySelectorAll('#pflegegrad-buttons button');
  
  const resultHvKlienten = document.getElementById('result-hvKlienten');
  const resultMonatlich = document.getElementById('result-monatlich');
  const resultJaehrlich = document.getElementById('result-jaehrlich');
  const contextFact = document.getElementById('context-fact');
  
  // State
  let state = {
    gesamtKlienten: 200,
    pflegegrad: 3,
    anteil67plus: 60
  };
  
  // Konstanten
  const MEHRUMSATZ_PRO_HV_KLIENT = 3000;
  const KONVERSIONSRATE = 0.15;
  const PFLEGEKRAFT_JAHRESKOSTEN = 72000;
  
  // Berechnung
  function calculate() {
    const klienten67plus = state.gesamtKlienten * (state.anteil67plus / 100);
    const hvKlienten = Math.round(klienten67plus * KONVERSIONSRATE);
    const monatlich = hvKlienten * MEHRUMSATZ_PRO_HV_KLIENT;
    const jaehrlich = monatlich * 12;
    
    return { hvKlienten, monatlich, jaehrlich };
  }
  
  // Zahlen formatieren
  function formatCurrency(num) {
    return num.toLocaleString('de-DE') + '€';
  }
  
  // Zahlen animieren
  function animateNumber(element, targetValue, isCurrency = false) {
    const currentText = element.textContent;
    const startValue = parseInt(currentText.replace(/\D/g, '')) || 0;
    const duration = 600;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easeProgress);
      
      element.textContent = isCurrency ? formatCurrency(currentValue) : currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  // Kontext-Fakt generieren
  function getContextFact(jaehrlich) {
    const pflegekraefte = Math.floor(jaehrlich / PFLEGEKRAFT_JAHRESKOSTEN);
    if (pflegekraefte >= 1) {
      return `Das entspricht <strong>${pflegekraefte} Vollzeit-Pflegekräften</strong>, die Sie zusätzlich finanzieren könnten.`;
    }
    return `Das ist genug für signifikante Investitionen in Ihre Mitarbeiter.`;
  }
  
  // UI aktualisieren
  function updateUI() {
    const results = calculate();
    
    animateNumber(resultHvKlienten, results.hvKlienten, false);
    animateNumber(resultMonatlich, results.monatlich, true);
    animateNumber(resultJaehrlich, results.jaehrlich, true);
    
    contextFact.innerHTML = getContextFact(results.jaehrlich);
  }
  
  // Event Listeners
  sliderKlienten.addEventListener('input', function() {
    state.gesamtKlienten = parseInt(this.value);
    displayKlienten.textContent = this.value;
    updateUI();
  });
  
  sliderAnteil.addEventListener('input', function() {
    state.anteil67plus = parseInt(this.value);
    displayAnteil.textContent = this.value + '%';
    updateUI();
  });
  
  pflegegradButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Alle Buttons zurücksetzen
      pflegegradButtons.forEach(btn => {
        btn.classList.remove('border-teal', 'bg-teal', 'text-white');
        btn.classList.add('border-gray-200');
      });
      
      // Aktiven Button stylen
      this.classList.remove('border-gray-200');
      this.classList.add('border-teal', 'bg-teal', 'text-white');
      
      state.pflegegrad = parseInt(this.dataset.value);
      updateUI();
    });
  });
  
  // Initial berechnen
  updateUI();
});

---

## Mobile Optimierung

### Layout-Änderungen
- Sliders: Full-Width, größere Touch-Targets (min. 44px)
- Ergebnis-Karten: 1-Spalte statt 3
- CTA: Sticky am Bottom nach Scroll (optional)

### Touch-Optimierung (CSS)

@media (max-width: 768px) {
  .slider-custom::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  }
  
  #pflegegrad-buttons {
    flex-wrap: wrap;
  }
  
  #pflegegrad-buttons button {
    flex: 1;
    min-width: 60px;
  }
}

---

## Analytics Events

// Event: Calculator interagiert
function trackInteraction(field, value) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'calculator_interaction',
      field: field,
      value: value
    });
  }
}

// Event: Ergebnis angezeigt
function trackResult(results) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'calculator_result',
      hvKlienten: results.hvKlienten,
      monatlichesPotenzial: results.monatlich,
      jaehrlichesPotenzial: results.jaehrlich
    });
  }
}

// Event: CTA geklickt
function trackCTAClick() {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'cta_click',
      location: 'calculator',
      type: 'booking'
    });
  }
}

---

## Testing Checklist

- [ ] Slider funktionieren auf Desktop (Mouse)
- [ ] Slider funktionieren auf Mobile (Touch)
- [ ] Zahlen-Animation läuft flüssig
- [ ] Keine Layout-Shifts bei Wertänderung
- [ ] CTA öffnet Cal.com korrekt
- [ ] Analytics Events feuern korrekt
- [ ] Accessibility: Keyboard-Navigation möglich
- [ ] Accessibility: Screen Reader Labels vorhanden
- [ ] Performance: Berechnung unter 100ms
- [ ] Responsive: Korrekte Darstellung auf allen Breakpoints

---

## Erweiterungsideen (V2)

1. **Lead Capture nach Berechnung**
   - "Ergebnis per E-Mail senden" → E-Mail-Feld einblenden
   - PDF-Export mit detaillierter Aufschlüsselung

2. **Erweiterte Eingaben** (optional einblendbar)
   - Anzahl Standorte
   - Aktueller Anteil SGB XII Klienten
   - Region (Stadt/Land)

3. **Vergleichsmodus**
   - "Was wäre, wenn Sie 20% mehr >67-Jährige hätten?"
   - Side-by-Side Vergleich

4. **Social Proof Integration**
   - "Pflegedienst XY hat mit ähnlichen Werten 1,2 Mio. € zusätzlich generiert"
