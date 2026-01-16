export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Was kostet die Zusammenarbeit mit Decari?',
    answer: 'Wir arbeiten <strong>100% erfolgsbasiert</strong>. Sie zahlen nur, wenn wir tatsächlich zusätzliche Leistungen für Ihre Klienten durchsetzen. Kein Erfolg = keine Kosten. Im Erstgespräch erklären wir Ihnen unser transparentes Vergütungsmodell.'
  },
  {
    question: 'Wie viel Aufwand haben wir als Pflegedienst?',
    answer: 'Minimal. Nach einem einmaligen Onboarding (2-3 Stunden) liegt Ihr monatlicher Aufwand bei <strong>ca. 1,5 Stunden pro Standort</strong>. Wir übernehmen den kompletten Behördenkontakt, die Antragsstellung und das Nachfassen.'
  },
  {
    question: 'Wie lange dauert es, bis wir erste Ergebnisse sehen?',
    answer: 'Je nach Leistungsart rechnen Sie mit <strong>4-12 Wochen</strong> bis zur ersten Bewilligung. Verhinderungspflege und Entlastungsbeträge gehen schneller, SGB XII und SGB IX dauern etwas länger. Wir starten parallel mehrere Anträge, sodass regelmäßig Bewilligungen eingehen.'
  },
  {
    question: 'Was passiert, wenn ein Antrag abgelehnt wird?',
    answer: 'Das gehört zum Geschäft – und wir bleiben dran. Wir legen <strong>Widerspruch ein</strong> und fechten unberechtigte Ablehnungen an. Unsere Erfahrung zeigt: Viele Erstablehnungen werden im Widerspruchsverfahren doch noch bewilligt. Sie haben damit keinen Aufwand.'
  },
  {
    question: 'Müssen wir neue Mitarbeiter einstellen?',
    answer: '<strong>Nein.</strong> Das ist der Kern unseres Angebots: Sie verdienen mehr mit denselben Klienten und demselben Team. Die höheren Budgets ermöglichen längere Einsätze statt Hektik – Ihre Mitarbeiter werden entlastet, nicht belastet.'
  }
];
