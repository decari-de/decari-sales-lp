export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  variant: "active" | "completed" | "pending";
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Potenzial-Analyse",
    description: "Wir prüfen, welche Ihrer Klienten Zusatzansprüche haben",
    variant: "active",
  },
  {
    number: 2,
    title: "Antragstellung",
    description: "Wir übernehmen den kompletten Behördenkram",
    variant: "pending",
  },
  {
    number: 3,
    title: "Mehr Umsatz",
    description: "Sie rechnen im Schnitt 30-50% mehr pro Klient ab",
    variant: "pending",
  },
];

// Neue erweiterte Phasen-Struktur
export interface ProcessPhase {
  number: number;
  title: string;
  description: string;
  details: string[];
  defaultOpen?: boolean;
}

export const processPhases: ProcessPhase[] = [
  {
    number: 1,
    title: "Analyse & Integration",
    description: "Wir identifizieren ungenutzte Ansprüche und integrieren uns in Ihren Prozess",
    details: [
      "Potenzial-Analyse aller Bestandsklienten auf ungenutzte Ansprüche",
      "Integration in Ihren Neukundenaufnahme-Prozess",
      "Realistische Einschätzung der Erfolgschancen für jeden Fall",
    ],
    defaultOpen: true,
  },
  {
    number: 2,
    title: "Persönliche Beratung",
    description: "Vollumfängliche Beratung zu allen zustehenden Leistungen",
    details: [
      "Beratung zu ALLEN zustehenden Leistungen (nicht nur Hilfe zur Pflege)",
      "Persönliche Beratungsgespräche mit Bestandsklienten",
      "Beratung für Neukunden ab Tag 1",
    ],
  },
  {
    number: 3,
    title: "Antragstellung & Durchsetzung",
    description: "Wir übernehmen den kompletten Behördenprozess",
    details: [
      "Komplette Antragsformulierung und Einreichung",
      "Gesamte Behördenkommunikation in Ihrem Namen",
      "Beantwortung aller Rückfragen vom Amt",
      "Widersprüche bei Ablehnungen",
      "Organisation von Rechtsbeistand wenn nötig",
    ],
  },
  {
    number: 4,
    title: "Mehr Umsatz & Nachbetreuung",
    description: "Kontinuierliche Betreuung für maximalen Erfolg",
    details: [
      "30-50% mehr Abrechnung pro berechtigtem Klient",
      "Folgeanträge bei Situationsänderungen (z.B. Pflegegraderhöhung)",
      "Langfristige Begleitung Ihrer Klienten",
    ],
  },
];
