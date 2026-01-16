export interface Benefit {
  title: string;
  description: string;
  iconPath: string;
}

export const benefits: Benefit[] = [
  {
    title: '+3.000€/Monat',
    description: 'Mehrumsatz pro Klient mit Zusatzanspruch – bei denselben Klienten',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  },
  {
    title: '~1,5h/Monat',
    description: 'Ihr Aufwand pro Standort – 100% Behördenkram übernehmen wir',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Weniger Stress',
    description: 'Höhere Budgets = längere Einsätze = zufriedenere Mitarbeiter',
    iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
];

export const servicesTags = [
  'Pflegegradhöherstufungen',
  'SGB XII – Hilfe zur Pflege',
  'SGB IX – Eingliederungshilfe',
  'Teilhabe am Arbeitsleben',
  'Persönliches Budget',
  'Verhinderungspflege',
  'Kurzzeitpflege',
  'Entlastungsbetrag',
  'Pflegegeld',
  'Pflegesachleistungen'
];
