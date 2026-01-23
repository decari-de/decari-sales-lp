/**
 * Regional Potential Calculator for Pflegedienste Directory
 *
 * Calculates estimated unrealized benefits for nursing service regions
 */

export interface RegionalPotential {
  monthlyPotential: number;
  yearlyPotential: number;
  potentialPerDienst: number;
  description: string;
}

// Base calculation values (can be adjusted based on real data)
const CONFIG = {
  // Average monthly additional benefits per eligible client
  avgBenefitPerClient: 350,
  // Average number of clients per nursing service
  avgClientsPerDienst: 45,
  // Percentage of clients typically eligible for additional benefits
  eligibilityRate: 0.15,
  // Percentage of eligible benefits that are typically NOT claimed
  unclaimedRate: 0.70,
};

/**
 * Calculate the regional potential for a city/region
 */
export function calculateRegionalPotential(
  stadtName: string,
  diensteCount: number
): RegionalPotential {
  // Calculate potential per individual nursing service
  const eligibleClientsPerDienst = Math.round(
    CONFIG.avgClientsPerDienst * CONFIG.eligibilityRate
  );

  const potentialPerDienst = Math.round(
    eligibleClientsPerDienst * CONFIG.avgBenefitPerClient * CONFIG.unclaimedRate
  );

  // Calculate regional totals
  const monthlyPotential = potentialPerDienst * diensteCount;
  const yearlyPotential = monthlyPotential * 12;

  // Generate description text
  const description = generateDescription(stadtName, yearlyPotential, diensteCount);

  return {
    monthlyPotential,
    yearlyPotential,
    potentialPerDienst,
    description,
  };
}

/**
 * Generate human-readable description for the potential
 */
function generateDescription(
  stadtName: string,
  yearlyPotential: number,
  diensteCount: number
): string {
  const formattedAmount = formatCurrency(yearlyPotential);

  if (diensteCount === 1) {
    return `Im Einzugsgebiet dieses Pflegedienstes werden schätzungsweise ${formattedAmount} pro Jahr an Sozialleistungen nicht abgerufen.`;
  }

  return `Im Raum ${stadtName} werden bei ${diensteCount} Pflegediensten schätzungsweise ${formattedAmount} pro Jahr an Sozialleistungen nicht abgerufen.`;
}

/**
 * Format number as German currency
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1).replace('.', ',')} Mio. EUR`;
  }
  return `${amount.toLocaleString('de-DE')} EUR`;
}

/**
 * Calculate potential for a single nursing service
 */
export function calculateSinglePotential(): {
  monthly: number;
  yearly: number;
  description: string;
} {
  const eligibleClients = Math.round(
    CONFIG.avgClientsPerDienst * CONFIG.eligibilityRate
  );

  const monthly = Math.round(
    eligibleClients * CONFIG.avgBenefitPerClient * CONFIG.unclaimedRate
  );

  return {
    monthly,
    yearly: monthly * 12,
    description: `Bei durchschnittlich ${eligibleClients} anspruchsberechtigten Klienten können bis zu ${formatCurrency(monthly)} pro Monat zusätzlich realisiert werden.`,
  };
}
