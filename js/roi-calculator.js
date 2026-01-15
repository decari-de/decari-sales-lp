/**
 * Decari ROI Calculator
 * Interactive calculator for estimating additional revenue potential
 *
 * V2 - Überarbeitete Logik (Januar 2025):
 * - Berücksichtigt BEIDE Altersgruppen (<67 und >67)
 * - Realistische Konversionsraten basierend auf Destatis-Daten
 * - Vereinfachtes UI mit nur 2 Eingaben
 */

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // DOM Elements
  // ========================================

  const sliderKlienten = document.getElementById("gesamtKlienten");
  const displayKlienten = document.getElementById("display-klienten");
  const pflegegradButtons = document.querySelectorAll(
    "#pflegegrad-buttons button",
  );

  const resultHvKlienten = document.getElementById("result-hvKlienten");
  const resultMonatlich = document.getElementById("result-monatlich");
  const resultJaehrlich = document.getElementById("result-jaehrlich");
  const contextFact = document.getElementById("context-fact");

  // Exit early if calculator elements don't exist
  if (!sliderKlienten) {
    return;
  }

  // ========================================
  // State
  // ========================================

  let state = {
    gesamtKlienten: 200,
    pflegegrad: 3,
  };

  // ========================================
  // Constants (Recherche-basiert, Stand 2025)
  // ========================================

  // Konversionsraten (realistisch, basierend auf Destatis 2024)
  const KONVERSIONSRATEN = {
    eingliederungshilfe: 0.03, // 3% - Klienten <67 mit Behinderung (SGB IX)
    hilfePflege: 0.04, // 4% - Klienten >67 mit geringem Einkommen (SGB XII)
    verhinderungspflege: 0.2, // 20% - Klienten PG2+ nutzen Budget nicht voll aus
    entlastungsbetrag: 0.3, // 30% - Klienten nutzen Entlastungsbetrag nicht voll aus
  };

  // Durchschnittlicher Mehrumsatz pro Leistungsart (€/Monat)
  const MEHRUMSATZ = {
    eingliederungshilfe: 2000, // SGB IX - Durchschnitt ~2.324€/Monat (Destatis)
    hilfePflege: 1500, // SGB XII - bedarfsorientiert, konservativ geschätzt
    verhinderungspflege: 295, // 3.539€/Jahr ÷ 12 (ab 07/2025)
    entlastungsbetrag: 131, // 131€/Monat (2025)
  };

  // Anteil Klienten mit PG 2+ (für Verhinderungspflege berechtigt)
  const ANTEIL_PG2_PLUS = {
    2: 0.7, // Bei durchschnittl. PG 2: ~70% haben PG2+
    3: 0.85, // Bei durchschnittl. PG 3: ~85% haben PG2+
    4: 0.95, // Bei durchschnittl. PG 4: ~95% haben PG2+
    5: 1.0, // Bei durchschnittl. PG 5: 100% haben PG2+
  };

  const PFLEGEKRAFT_JAHRESKOSTEN = 72000; // Annual cost per caregiver
  const MONATE_PRO_JAHR = 12;

  // ========================================
  // Calculation Functions (NEUE LOGIK)
  // ========================================

  function calculate() {
    const { gesamtKlienten, pflegegrad } = state;

    // Anteil Klienten mit PG 2+ basierend auf durchschnittlichem Pflegegrad
    const anteilPG2plus = ANTEIL_PG2_PLUS[pflegegrad] || 0.85;
    const klientenPG2plus = gesamtKlienten * anteilPG2plus;

    // Potenzial pro Leistungsart berechnen
    const potenzialEingliederung = Math.round(
      gesamtKlienten *
        KONVERSIONSRATEN.eingliederungshilfe *
        MEHRUMSATZ.eingliederungshilfe,
    );

    const potenzialHilfePflege = Math.round(
      gesamtKlienten * KONVERSIONSRATEN.hilfePflege * MEHRUMSATZ.hilfePflege,
    );

    const potenzialVerhinderung = Math.round(
      klientenPG2plus *
        KONVERSIONSRATEN.verhinderungspflege *
        MEHRUMSATZ.verhinderungspflege,
    );

    const potenzialEntlastung = Math.round(
      gesamtKlienten *
        KONVERSIONSRATEN.entlastungsbetrag *
        MEHRUMSATZ.entlastungsbetrag,
    );

    // Gesamtpotenzial
    const monatlich =
      potenzialEingliederung +
      potenzialHilfePflege +
      potenzialVerhinderung +
      potenzialEntlastung;

    // High-Value Klienten (SGB IX + SGB XII)
    const hvKlienten = Math.round(
      gesamtKlienten *
        (KONVERSIONSRATEN.eingliederungshilfe + KONVERSIONSRATEN.hilfePflege),
    );

    return {
      hvKlienten: hvKlienten,
      monatlich: monatlich,
      jaehrlich: monatlich * MONATE_PRO_JAHR,
      // Für erweiterte Anzeige (optional)
      details: {
        eingliederung: potenzialEingliederung,
        hilfePflege: potenzialHilfePflege,
        verhinderung: potenzialVerhinderung,
        entlastung: potenzialEntlastung,
      },
    };
  }

  // ========================================
  // Formatting Functions
  // ========================================

  function formatCurrency(num) {
    return num.toLocaleString("de-DE") + "€";
  }

  function formatNumber(num) {
    return num.toLocaleString("de-DE");
  }

  // ========================================
  // Animation Functions
  // ========================================

  function animateNumber(
    element,
    targetValue,
    isCurrency = false,
    duration = 600,
  ) {
    if (!element) return;

    const currentText = element.textContent;
    const startValue = parseInt(currentText.replace(/\D/g, "")) || 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(
        startValue + (targetValue - startValue) * easeProgress,
      );

      element.textContent = isCurrency
        ? formatCurrency(currentValue)
        : formatNumber(currentValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ========================================
  // Context Fact Generation
  // ========================================

  function getContextFact(jaehrlich, hvKlienten) {
    const facts = [];

    // Fact 1: Financeable caregivers
    const finanzierbarePflegekraefte = Math.floor(
      jaehrlich / PFLEGEKRAFT_JAHRESKOSTEN,
    );
    if (finanzierbarePflegekraefte >= 1) {
      facts.push(
        `Das entspricht <strong>${finanzierbarePflegekraefte} Vollzeit-Pflegekräften</strong>, die Sie zusätzlich finanzieren könnten.`,
      );
    }

    // Fact 2: Salary increases
    const gehaltsErhoehungProMitarbeiter = 500;
    const mitarbeiterMitErhoehung = Math.floor(
      jaehrlich / MONATE_PRO_JAHR / gehaltsErhoehungProMitarbeiter,
    );
    if (mitarbeiterMitErhoehung >= 3) {
      facts.push(
        `Das ist genug, um <strong>${mitarbeiterMitErhoehung} Mitarbeitern</strong> eine Gehaltserhöhung von 500€/Monat zu finanzieren.`,
      );
    }

    // Fact 3: Percentage increase (based on realistic average revenue)
    const durchschnittUmsatzProKlient = 1300; // Realistischer Durchschnitt (Recherche)
    const aktuellerUmsatz =
      state.gesamtKlienten * durchschnittUmsatzProKlient * MONATE_PRO_JAHR;
    const steigerungProzent = Math.round((jaehrlich / aktuellerUmsatz) * 100);
    if (steigerungProzent > 5) {
      facts.push(
        `Das entspricht einer <strong>Umsatzsteigerung von ${steigerungProzent}%</strong> – ohne einen einzigen neuen Klienten.`,
      );
    }

    // Fact 4: High-Value client benefit (NEW)
    if (hvKlienten >= 5) {
      const mehrumsatzProHV = Math.round(
        jaehrlich / hvKlienten / MONATE_PRO_JAHR,
      );
      facts.push(
        `Ihre <strong>${hvKlienten} High-Value-Klienten</strong> bringen durchschnittlich ${formatCurrency(mehrumsatzProHV)} Mehrumsatz pro Monat.`,
      );
    }

    // Return a random fact (or the first one if only one exists)
    if (facts.length === 0) {
      return "Starten Sie jetzt und erschließen Sie Ihr ungenutztes Potenzial.";
    }

    // Rotate facts based on a simple hash of current values
    const factIndex = (state.gesamtKlienten + state.pflegegrad) % facts.length;
    return facts[factIndex];
  }

  // ========================================
  // Slider Track Update
  // ========================================

  function updateSliderTrack(slider) {
    if (!slider) return;

    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;

    slider.style.background = `linear-gradient(to right, #097788 0%, #097788 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  }

  // ========================================
  // UI Update Function
  // ========================================

  let debounceTimer;

  function updateUI() {
    // Debounce to prevent calculation flood during rapid slider movement
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const results = calculate();

      // Animate numbers
      animateNumber(resultHvKlienten, results.hvKlienten, false);
      animateNumber(resultMonatlich, results.monatlich, true);
      animateNumber(resultJaehrlich, results.jaehrlich, true);

      // Update context fact
      if (contextFact) {
        contextFact.innerHTML = getContextFact(
          results.jaehrlich,
          results.hvKlienten,
        );
      }
    }, 50);
  }

  // ========================================
  // Event Listeners
  // ========================================

  // Slider: Gesamtklienten
  sliderKlienten.addEventListener("input", function () {
    state.gesamtKlienten = parseInt(this.value);
    if (displayKlienten) {
      displayKlienten.textContent = formatNumber(this.value);
    }
    updateSliderTrack(this);
    updateUI();

    // Update ARIA attribute
    this.setAttribute("aria-valuenow", this.value);
  });

  // Pflegegrad Buttons
  pflegegradButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Reset all buttons
      pflegegradButtons.forEach((btn) => {
        btn.classList.remove("border-teal", "bg-teal", "text-white");
        btn.classList.add("border-gray-200");
      });

      // Style active button
      this.classList.remove("border-gray-200");
      this.classList.add("border-teal", "bg-teal", "text-white");

      // Update state
      state.pflegegrad = parseInt(this.dataset.value);
      updateUI();
    });

    // Keyboard accessibility
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // ========================================
  // Initialization
  // ========================================

  // Initialize slider track
  updateSliderTrack(sliderKlienten);

  // Initial calculation
  updateUI();

  // ========================================
  // Smooth Scroll for CTA Links
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
