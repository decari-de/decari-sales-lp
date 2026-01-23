/**
 * Search Index for City Search
 * Generated from pflegedienste.ts data
 */

import { staedte } from './pflegedienste';

export interface SearchableCity {
  name: string;
  bundesland: string;
  url: string;
  count: number;
}

// Create a lightweight search index from the cities data
export const citySearchIndex: SearchableCity[] = staedte.map(stadt => ({
  name: stadt.name,
  bundesland: stadt.bundesland,
  url: `/pflegedienste/${stadt.bundeslandSlug}/${stadt.slug}/`,
  count: stadt.diensteCount
}));

// Export total count for display purposes
export const totalCities = citySearchIndex.length;
