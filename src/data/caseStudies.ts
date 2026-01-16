export interface CaseStudy {
  name: string;
  age: number;
  condition: string;
  before: string[];
  after: string[];
  result: string;
  tags: string[];
  iconPath: string;
}

export const caseStudies: CaseStudy[] = [
  {
    name: 'Frau Schmidt',
    age: 82,
    condition: 'Demenz',
    before: ['Pflegegrad 4', 'Nur Sachleistungen (1.778€)', 'Tochter am Limit'],
    after: ['Höherstufung auf PG5', '+ Hilfe zur Pflege (SGB XII)', '24h-Betreuung möglich'],
    result: '+2.800€/Monat',
    tags: ['Hilfe zur Pflege', 'Höherstufung'],
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    name: 'Herr Weber',
    age: 34,
    condition: 'Multiple Sklerose',
    before: ['Pflegegrad 2', 'Keine Zusatzleistungen', 'Drohender Jobverlust'],
    after: ['Eingliederungshilfe (SGB IX)', 'Teilhabe am Arbeitsleben', 'Arbeitsassistenz finanziert'],
    result: '+3.200€/Monat',
    tags: ['Eingliederung', 'Teilhabe'],
    iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    name: 'Herr Yilmaz',
    age: 71,
    condition: 'Schlaganfall-Folgen',
    before: ['Pflegegrad 3', 'Nur Pflegegeld', 'Ehefrau überfordert'],
    after: ['Höherstufung auf PG4', 'Kombileistung + Kurzzeitpflege', 'Regelmäßige Entlastung'],
    result: '+2.400€/Monat',
    tags: ['Höherstufung', 'Kurzzeitpflege'],
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  }
];
