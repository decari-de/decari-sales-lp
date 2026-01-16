export interface ProcessStep {
  number: number;
  title: string;
  duration: string;
  description: string;
  variant: 'active' | 'completed' | 'pending';
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Onboarding',
    duration: '2-3h einmalig',
    description: 'Setup & Schulung',
    variant: 'completed'
  },
  {
    number: 2,
    title: 'Anspruchsprüfung',
    duration: '30 Min/Fall',
    description: 'Welche Klienten qualifizieren sich?',
    variant: 'completed'
  },
  {
    number: 3,
    title: 'Durchsetzung',
    duration: '100% Decari',
    description: 'Anträge & Behörden',
    variant: 'active'
  },
  {
    number: 4,
    title: 'Abrechnung',
    duration: '20 Min/Monat',
    description: 'Dokumentation',
    variant: 'pending'
  },
  {
    number: 5,
    title: 'Folgeanträge',
    duration: '30 Min/Fall',
    description: 'Verlängerungen',
    variant: 'pending'
  }
];
