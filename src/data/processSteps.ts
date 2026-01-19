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
