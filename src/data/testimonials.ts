export interface Testimonial {
  quote: string;
  highlight: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Wir wussten, dass viele unserer Klienten Anspruch auf mehr haben – aber uns fehlte die Zeit, das durchzusetzen. ',
    highlight: 'Decari hat uns in 3 Monaten über 15.000€ Mehrumsatz gebracht – bei null Mehraufwand für unser Team.',
    authorName: 'Maria K.',
    authorRole: 'Pflegedienstleitung, NRW',
    authorInitials: 'MK',
    rating: 5
  },
  {
    quote: 'Endlich jemand, der den Behördenkram für uns macht. ',
    highlight: 'Meine Pflegekräfte können sich auf die Pflege konzentrieren – und wir haben trotzdem bessere Margen. Das hätte ich früher wissen sollen.',
    authorName: 'Thomas S.',
    authorRole: 'Geschäftsführer, Bayern',
    authorInitials: 'TS',
    rating: 5
  }
];
