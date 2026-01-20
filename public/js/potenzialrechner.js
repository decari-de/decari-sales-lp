/**
 * Decari Potenzial-Rechner
 * Interactive calculator for estimating additional revenue potential
 *
 * V3 - Neue Logik (Januar 2025):
 * - Fokus auf SGB XII (Hilfe zur Pflege) und SGB IX (Eingliederungshilfe)
 * - Entfernung von Entlastungsbetrag und Verhinderungspflege
 * - Neue Eingaben: Bundesland, EGH-Zulassung, Finanzielle Situation
 * - Regionale Stundensätze basierend auf Playbook-Daten
 */

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // DOM Elements
  // ========================================

  const sliderKlienten = document.getElementById("gesamtKlienten");
  const displayKlienten = document.getElementById("display-klienten");
  const bundeslandSelect = document.getElementById("bundesland");
  const eghButtons = document.querySelectorAll("#egh-toggle button");
  const finanzButtons = document.querySelectorAll("#finanz-buttons button");
  const sliderAlter = document.getElementById("anteilUnter67");
  const displayAlter = document.getElementById("display-alter");

  const resultHvKlienten = document.getElementById("result-hvKlienten");
  const resultMonatlich = document.getElementById("result-monatlich");
  const resultJaehrlich = document.getElementById("result-jaehrlich");
  const transparenzBox = document.getElementById("transparenz-box");
  const transparenzBundesland = document.getElementById(
    "transparenz-bundesland",
  );
  const bundeslandHint = document.getElementById("bundesland-hint");
  const resultCards = document.querySelector("#calculator-results .grid");

  // Exit early if calculator elements don't exist
  if (!sliderKlienten) {
    return;
  }

  // ========================================
  // Constants - Bundesland-Daten
  // ========================================

  // Stundensätze basierend auf Playbook-Annahmen (Januar 2025)
  // hzp = Hilfe zur Pflege (SGB XII), egh = Eingliederungshilfe (SGB IX)
  const BUNDESLAND_DATA = {
    "Baden-Württemberg": { hzp: 45.0, egh: 32.0 },
    Bayern: { hzp: 45.5, egh: 31.57 },
    Berlin: { hzp: 48.0, egh: 33.0 },
    Brandenburg: { hzp: 38.0, egh: 28.0 },
    Bremen: { hzp: 44.0, egh: 30.0 },
    Hamburg: { hzp: 46.0, egh: 34.0 },
    Hessen: { hzp: 46.0, egh: 30.0 },
    "Mecklenburg-Vorpommern": { hzp: 36.0, egh: 27.0 },
    Niedersachsen: { hzp: 42.0, egh: 29.0 },
    "Nordrhein-Westfalen": { hzp: 43.8, egh: 33.48 },
    "Rheinland-Pfalz": { hzp: 43.0, egh: 29.0 },
    Saarland: { hzp: 42.0, egh: 29.0 },
    Sachsen: { hzp: 38.0, egh: 27.0 },
    "Sachsen-Anhalt": { hzp: 37.0, egh: 27.0 },
    "Schleswig-Holstein": { hzp: 43.0, egh: 30.0 },
    Thüringen: { hzp: 37.0, egh: 27.0 },
  };

  // ========================================
  // Constants - Berechnungsparameter
  // ========================================

  const KONVERSIONSRATE = 0.2; // 20% der Zielgruppe
  const STUNDEN_HZP = 50; // Monatliche Stunden HzP
  const STUNDEN_EGH = 60; // Monatliche Stunden EGH

  // Vermögens-Faktoren (Proxy für Anteil mit Vermögen < 10k€)
  const VERMOEGEN_FAKTOREN_HZP = {
    wohlhabend: 0.15,
    gemischt: 0.3,
    bescheiden: 0.45,
  };

  // Vermögens-Faktoren (Proxy für Anteil mit Vermögen < 71k€)
  const VERMOEGEN_FAKTOREN_EGH = {
    wohlhabend: 0.3,
    gemischt: 0.6,
    bescheiden: 0.9,
  };

  const MONATE_PRO_JAHR = 12;

  // ========================================
  // State
  // ========================================

  let state = {
    gesamtKlienten: 120,
    bundesland: null,
    hatEgh: false,
    finanzielleSituation: "gemischt",
    anteilUnter67: 0.15,
  };

  // ========================================
  // Calculation Function (V3 Logic)
  // ========================================

  function calculate() {
    const {
      gesamtKlienten,
      bundesland,
      hatEgh,
      finanzielleSituation,
      anteilUnter67,
    } = state;

    // Return zeros if Bundesland not selected
    if (!bundesland || !BUNDESLAND_DATA[bundesland]) {
      return {
        hvKlienten: 0,
        monatlich: 0,
        jaehrlich: 0,
        breakdown: null,
      };
    }

    const rates = BUNDESLAND_DATA[bundesland];
    const vermoegensFaktorHZP = VERMOEGEN_FAKTOREN_HZP[finanzielleSituation];
    const vermoegensFaktorEGH = VERMOEGEN_FAKTOREN_EGH[finanzielleSituation];

    // HzP: Klienten >67 UND passendes Vermögensprofil
    const klientenUeber67 = Math.round(gesamtKlienten * (1 - anteilUnter67));
    const mitNiedrigemVermoegenHZP = Math.round(
      klientenUeber67 * vermoegensFaktorHZP,
    );
    const hzpKlienten = Math.round(mitNiedrigemVermoegenHZP * KONVERSIONSRATE);
    const hzpUmsatz = hzpKlienten * STUNDEN_HZP * rates.hzp;

    // EGH: Nur wenn Zulassung vorhanden, Klienten <67
    const klientenUnter67 = Math.round(gesamtKlienten * anteilUnter67);
    const mitNiedrigemVermoegenEGH = Math.round(
      klientenUnter67 * vermoegensFaktorEGH,
    );
    let eghKlienten = 0;
    let eghUmsatz = 0;
    if (hatEgh) {
      eghKlienten = Math.round(mitNiedrigemVermoegenEGH * KONVERSIONSRATE);
      eghUmsatz = eghKlienten * STUNDEN_EGH * rates.egh;
    }

    const monatlich = hzpUmsatz + eghUmsatz;

    return {
      hvKlienten: hzpKlienten + eghKlienten,
      monatlich: Math.round(monatlich),
      jaehrlich: Math.round(monatlich * MONATE_PRO_JAHR),
      breakdown: {
        gesamt: gesamtKlienten,
        hzp: {
          klientenUeber67: klientenUeber67,
          mitNiedrigemVermoegen: mitNiedrigemVermoegenHZP,
          klienten: hzpKlienten,
          stunden: STUNDEN_HZP,
          satz: rates.hzp,
          umsatz: Math.round(hzpUmsatz),
        },
        egh: {
          klientenUnter67: klientenUnter67,
          klienten: eghKlienten,
          stunden: STUNDEN_EGH,
          satz: rates.egh,
          umsatz: Math.round(eghUmsatz),
        },
        hatEgh: hatEgh,
      },
    };
  }

  // ========================================
  // Formatting Functions
  // ========================================

  function formatCurrency(num) {
    return num.toLocaleString("de-DE") + " €";
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

      // Check if Bundesland is selected
      const bundeslandSelected =
        state.bundesland && BUNDESLAND_DATA[state.bundesland];

      if (bundeslandSelected) {
        // Hide hint, show results
        if (bundeslandHint) bundeslandHint.classList.add("hidden");
        if (resultCards) resultCards.classList.remove("hidden");

        // Animate numbers
        animateNumber(resultHvKlienten, results.hvKlienten, false);
        animateNumber(resultMonatlich, results.monatlich, true);
        animateNumber(resultJaehrlich, results.jaehrlich, true);

        // Update transparency box with Bundesland name
        if (transparenzBundesland) {
          transparenzBundesland.textContent = state.bundesland;
        }

        // Update transparency box with real breakdown numbers
        if (results.breakdown) {
          updateTransparenzBox(results.breakdown);
        }

        // Show transparency box
        if (transparenzBox) {
          transparenzBox.classList.remove("hidden");
        }
      } else {
        // Show hint, hide results when no Bundesland selected
        if (bundeslandHint) bundeslandHint.classList.remove("hidden");
        if (resultCards) resultCards.classList.add("hidden");

        // Hide transparency box
        if (transparenzBox) {
          transparenzBox.classList.add("hidden");
        }
      }
    }, 50);
  }

  // ========================================
  // Transparency Box Update Function
  // ========================================

  function updateTransparenzBox(breakdown) {
    // Helper to safely update element text
    const updateEl = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    // HzP section values
    updateEl("t-gesamt", formatNumber(breakdown.gesamt));
    updateEl("t-ueber67", formatNumber(breakdown.hzp.klientenUeber67));
    updateEl(
      "t-niedrigVermoegen",
      formatNumber(breakdown.hzp.mitNiedrigemVermoegen),
    );
    updateEl("t-hzpKlienten", formatNumber(breakdown.hzp.klienten));
    updateEl("t-hzpUmsatz", formatCurrency(breakdown.hzp.umsatz));

    // EGH section values
    updateEl("t-gesamt2", formatNumber(breakdown.gesamt));
    updateEl("t-unter67", formatNumber(breakdown.egh.klientenUnter67));
    updateEl("t-eghKlienten", formatNumber(breakdown.egh.klienten));
    updateEl("t-eghUmsatz", formatCurrency(breakdown.egh.umsatz));

    // Show/hide EGH section based on whether they have EGH license
    const eghSection = document.getElementById("transparenz-egh");
    if (eghSection) {
      if (breakdown.hatEgh) {
        eghSection.classList.remove("hidden");
      } else {
        eghSection.classList.add("hidden");
      }
    }
  }

  // ========================================
  // Button Group Helper
  // ========================================

  function setActiveButton(
    buttons,
    activeValue,
    activeClasses,
    inactiveClasses,
  ) {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.value === String(activeValue);

      // Remove all classes first
      activeClasses.forEach((cls) => btn.classList.remove(cls));
      inactiveClasses.forEach((cls) => btn.classList.remove(cls));

      if (isActive) {
        activeClasses.forEach((cls) => btn.classList.add(cls));
      } else {
        inactiveClasses.forEach((cls) => btn.classList.add(cls));
      }
    });
  }

  // ========================================
  // Event Listeners
  // ========================================

  // Slider: Gesamtklienten
  if (sliderKlienten) {
    sliderKlienten.addEventListener("input", function () {
      state.gesamtKlienten = parseInt(this.value);
      if (displayKlienten) {
        displayKlienten.textContent = formatNumber(this.value);
      }
      updateSliderTrack(this);
      updateUI();
      this.setAttribute("aria-valuenow", this.value);
    });
  }

  // Dropdown: Bundesland
  if (bundeslandSelect) {
    bundeslandSelect.addEventListener("change", function () {
      state.bundesland = this.value || null;
      updateUI();
    });
  }

  // Toggle: EGH-Zulassung
  eghButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.dataset.value === "true";
      state.hatEgh = value;

      setActiveButton(
        eghButtons,
        value,
        ["border-teal", "bg-teal", "text-white"],
        ["border-gray-200", "text-gray-700"],
      );

      updateUI();
    });

    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Buttons: Finanzielle Situation
  finanzButtons.forEach((button) => {
    button.addEventListener("click", function () {
      state.finanzielleSituation = this.dataset.value;

      setActiveButton(
        finanzButtons,
        this.dataset.value,
        ["border-teal", "bg-teal", "text-white"],
        ["border-gray-200", "text-gray-700"],
      );

      updateUI();
    });

    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Slider: Altersverteilung
  if (sliderAlter) {
    sliderAlter.addEventListener("input", function () {
      state.anteilUnter67 = parseInt(this.value) / 100;
      if (displayAlter) {
        displayAlter.textContent = this.value + "%";
      }
      updateSliderTrack(this);
      updateUI();
    });
  }

  // ========================================
  // Initialization
  // ========================================

  // Initialize slider tracks
  updateSliderTrack(sliderKlienten);
  if (sliderAlter) {
    updateSliderTrack(sliderAlter);
  }

  // Set initial button states
  setActiveButton(
    eghButtons,
    false,
    ["border-teal", "bg-teal", "text-white"],
    ["border-gray-200", "text-gray-700"],
  );

  setActiveButton(
    finanzButtons,
    "gemischt",
    ["border-teal", "bg-teal", "text-white"],
    ["border-gray-200", "text-gray-700"],
  );

  // Initial UI update
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

  // ========================================
  // Tooltip Functionality for Info Buttons
  // ========================================

  const tooltip = document.getElementById("tooltip");
  const infoButtons = document.querySelectorAll(".info-btn");

  if (tooltip && infoButtons.length > 0) {
    let activeTooltipBtn = null;

    function showTooltip(btn) {
      const text = btn.dataset.tooltip;
      if (!text) return;

      tooltip.textContent = text;
      tooltip.classList.remove("hidden");

      // Position tooltip below the button
      const btnRect = btn.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      // Calculate position (centered below button)
      let left = btnRect.left + btnRect.width / 2 - tooltipRect.width / 2;
      let top = btnRect.bottom + 8;

      // Ensure tooltip doesn't overflow viewport
      const padding = 16;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;

      activeTooltipBtn = btn;
    }

    function hideTooltip() {
      tooltip.classList.add("hidden");
      activeTooltipBtn = null;
    }

    infoButtons.forEach((btn) => {
      // Click to toggle on mobile
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (activeTooltipBtn === btn) {
          hideTooltip();
        } else {
          showTooltip(btn);
        }
      });

      // Hover for desktop
      btn.addEventListener("mouseenter", function () {
        showTooltip(btn);
      });

      btn.addEventListener("mouseleave", function () {
        hideTooltip();
      });
    });

    // Close tooltip when clicking outside
    document.addEventListener("click", function (e) {
      if (activeTooltipBtn && !e.target.closest(".info-btn")) {
        hideTooltip();
      }
    });

    // Close tooltip on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && activeTooltipBtn) {
        hideTooltip();
      }
    });
  }
});
