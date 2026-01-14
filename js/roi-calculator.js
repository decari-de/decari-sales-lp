/**
 * Decari ROI Calculator
 * Interactive calculator for estimating additional revenue potential
 */

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // DOM Elements
  // ========================================

  const sliderKlienten = document.getElementById('gesamtKlienten');
  const sliderAnteil = document.getElementById('anteil67plus');
  const displayKlienten = document.getElementById('display-klienten');
  const displayAnteil = document.getElementById('display-anteil');
  const pflegegradButtons = document.querySelectorAll('#pflegegrad-buttons button');

  const resultHvKlienten = document.getElementById('result-hvKlienten');
  const resultMonatlich = document.getElementById('result-monatlich');
  const resultJaehrlich = document.getElementById('result-jaehrlich');
  const contextFact = document.getElementById('context-fact');

  // Exit early if calculator elements don't exist
  if (!sliderKlienten || !sliderAnteil) {
    return;
  }

  // ========================================
  // State
  // ========================================

  let state = {
    gesamtKlienten: 200,
    pflegegrad: 3,
    anteil67plus: 60
  };

  // ========================================
  // Constants
  // ========================================

  const MEHRUMSATZ_PRO_HV_KLIENT = 3000; // Euro per month
  const KONVERSIONSRATE = 0.15; // 15% of >67 year olds are HV candidates
  const PFLEGEKRAFT_JAHRESKOSTEN = 72000; // Annual cost per caregiver
  const MONATE_PRO_JAHR = 12;

  // ========================================
  // Calculation Functions
  // ========================================

  function calculate() {
    const klienten67plus = state.gesamtKlienten * (state.anteil67plus / 100);
    const hvKlienten = Math.round(klienten67plus * KONVERSIONSRATE);
    const monatlich = hvKlienten * MEHRUMSATZ_PRO_HV_KLIENT;
    const jaehrlich = monatlich * MONATE_PRO_JAHR;

    return {
      hvKlienten: hvKlienten,
      monatlich: monatlich,
      jaehrlich: jaehrlich
    };
  }

  // ========================================
  // Formatting Functions
  // ========================================

  function formatCurrency(num) {
    return num.toLocaleString('de-DE') + '€';
  }

  function formatNumber(num) {
    return num.toLocaleString('de-DE');
  }

  // ========================================
  // Animation Functions
  // ========================================

  function animateNumber(element, targetValue, isCurrency = false, duration = 600) {
    const currentText = element.textContent;
    const startValue = parseInt(currentText.replace(/\D/g, '')) || 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easeProgress);

      element.textContent = isCurrency ? formatCurrency(currentValue) : formatNumber(currentValue);

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
    const finanzierbarePflegekraefte = Math.floor(jaehrlich / PFLEGEKRAFT_JAHRESKOSTEN);
    if (finanzierbarePflegekraefte >= 1) {
      facts.push(`Das entspricht <strong>${finanzierbarePflegekraefte} Vollzeit-Pflegekräften</strong>, die Sie zusätzlich finanzieren könnten.`);
    }

    // Fact 2: Salary increases
    const gehaltsErhoehungProMitarbeiter = 500;
    const mitarbeiterMitErhoehung = Math.floor((jaehrlich / MONATE_PRO_JAHR) / gehaltsErhoehungProMitarbeiter);
    if (mitarbeiterMitErhoehung >= 3) {
      facts.push(`Das ist genug, um <strong>${mitarbeiterMitErhoehung} Mitarbeitern</strong> eine Gehaltserhöhung von 500€/Monat zu finanzieren.`);
    }

    // Fact 3: Percentage increase (rough estimate)
    const durchschnittUmsatzProKlient = 1500; // Rough average
    const aktuellerUmsatz = state.gesamtKlienten * durchschnittUmsatzProKlient * MONATE_PRO_JAHR;
    const steigerungProzent = Math.round((jaehrlich / aktuellerUmsatz) * 100);
    if (steigerungProzent > 5) {
      facts.push(`Das entspricht einer <strong>Umsatzsteigerung von ${steigerungProzent}%</strong> – ohne einen einzigen neuen Klienten.`);
    }

    // Return a random fact (or the first one if only one exists)
    if (facts.length === 0) {
      return 'Starten Sie jetzt und erschließen Sie Ihr ungenutztes Potenzial.';
    }

    // Rotate facts based on a simple hash of current values
    const factIndex = (state.gesamtKlienten + state.anteil67plus) % facts.length;
    return facts[factIndex];
  }

  // ========================================
  // Slider Track Update
  // ========================================

  function updateSliderTrack(slider) {
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
      contextFact.innerHTML = getContextFact(results.jaehrlich, results.hvKlienten);

      // Track analytics event (if available)
      if (typeof gtag === 'function') {
        gtag('event', 'calculator_result', {
          'event_category': 'engagement',
          'event_label': 'roi_calculator',
          'value': results.jaehrlich
        });
      }
    }, 50);
  }

  // ========================================
  // Event Listeners
  // ========================================

  // Slider: Gesamtklienten
  sliderKlienten.addEventListener('input', function() {
    state.gesamtKlienten = parseInt(this.value);
    displayKlienten.textContent = formatNumber(this.value);
    updateSliderTrack(this);
    updateUI();

    // Update ARIA attribute
    this.setAttribute('aria-valuenow', this.value);
  });

  // Slider: Anteil >67 Jahre
  sliderAnteil.addEventListener('input', function() {
    state.anteil67plus = parseInt(this.value);
    displayAnteil.textContent = this.value + '%';
    updateSliderTrack(this);
    updateUI();

    // Update ARIA attribute
    this.setAttribute('aria-valuenow', this.value);
  });

  // Pflegegrad Buttons
  pflegegradButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Reset all buttons
      pflegegradButtons.forEach(btn => {
        btn.classList.remove('border-teal', 'bg-teal', 'text-white');
        btn.classList.add('border-gray-200');
      });

      // Style active button
      this.classList.remove('border-gray-200');
      this.classList.add('border-teal', 'bg-teal', 'text-white');

      // Update state
      state.pflegegrad = parseInt(this.dataset.value);
      updateUI();
    });

    // Keyboard accessibility
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // ========================================
  // Track Calculator Interaction
  // ========================================

  function trackInteraction(field, value) {
    if (typeof gtag === 'function') {
      gtag('event', 'calculator_interaction', {
        'event_category': 'engagement',
        'event_label': field,
        'value': value
      });
    }
  }

  // Add tracking to sliders (on change, not input)
  sliderKlienten.addEventListener('change', function() {
    trackInteraction('gesamtKlienten', this.value);
  });

  sliderAnteil.addEventListener('change', function() {
    trackInteraction('anteil67plus', this.value);
  });

  // ========================================
  // Initialization
  // ========================================

  // Initialize slider tracks
  updateSliderTrack(sliderKlienten);
  updateSliderTrack(sliderAnteil);

  // Initial calculation
  updateUI();

  // ========================================
  // Smooth Scroll for CTA Links
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
