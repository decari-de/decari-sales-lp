export interface Problem {
  iconColor: "orange" | "yellow" | "red";
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  iconPath: string;
}

export const problems: Problem[] = [
  {
    iconColor: "orange",
    title: "Margen unter Druck",
    description:
      "Die Kassen zahlen unter 30€ für Leistungen, die Sie über 45€ kosten. Schwere Pflegefälle werden zum Verlustgeschäft.",
    stat: "1-2%",
    statLabel: "Umsatzrendite – eingebrochen",
    iconPath:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    iconColor: "yellow",
    title: "Personal am Limit",
    description:
      "12 Einsätze in 8 Stunden. Ihre Pflegekräfte hetzen von Termin zu Termin – keine Zeit für echte Pflege.",
    stat: "65%",
    statLabel: "Fluktuation pro Jahr",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    iconColor: "red",
    title: "Wachstum blockiert",
    description:
      "Selbst wenn Sie wachsen wollten – ohne neue Mitarbeiter geht nichts. Und die sind nicht zu finden.",
    stat: "80%",
    statLabel: "mussten Anfragen ablehnen",
    iconPath:
      "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
  },
];
