/**
 * CSV to TypeScript Converter for Pflegedienste Directory
 *
 * Reads pflegedienste_folk_final.csv and generates src/data/pflegedienste.ts
 *
 * Run with: node scripts/convert-pflegedienste-csv.js
 * Run with limit: node scripts/convert-pflegedienste-csv.js --limit=5000
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const limitArg = args.find((arg) => arg.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : null;

if (LIMIT) {
  console.log(
    `⚠️  Limiting to ${LIMIT} Pflegedienste (for Cloudflare Pages 20k limit)`,
  );
}

// Paths
const CSV_PATH = join(__dirname, "..", "pflegedienste_folk_final.csv");
const OUTPUT_PATH = join(__dirname, "..", "src", "data", "pflegedienste.ts");

/**
 * Normalize German characters and create URL-safe slug
 */
function slugify(text) {
  if (!text) return "";

  return (
    text
      .toLowerCase()
      // German character normalization
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/Ä/g, "ae")
      .replace(/Ö/g, "oe")
      .replace(/Ü/g, "ue")
      // Remove special characters except spaces and hyphens
      .replace(/[^a-z0-9\s-]/g, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove multiple consecutive hyphens
      .replace(/-+/g, "-")
      // Trim hyphens from start and end
      .replace(/^-+|-+$/g, "")
      // Limit length
      .substring(0, 80)
  );
}

/**
 * Parse CSV line handling quoted fields with commas
 */
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

/**
 * Extract city and PLZ from address field
 * Format: "Straße 123, 12345 Stadt"
 */
function parseAddress(address) {
  if (!address) return { street: "", plz: "", city: "" };

  // Remove quotes
  address = address.replace(/^"|"$/g, "");

  // Try to find PLZ pattern (5 digits)
  const plzMatch = address.match(/(\d{5})\s+(.+)$/);

  if (plzMatch) {
    const streetPart = address
      .substring(0, address.indexOf(plzMatch[0]))
      .replace(/,\s*$/, "");
    return {
      street: streetPart.trim(),
      plz: plzMatch[1],
      city: plzMatch[2].trim(),
    };
  }

  return { street: address, plz: "", city: "" };
}

/**
 * Main conversion function
 */
function convertCSV() {
  console.log("Reading CSV file...");
  const csvContent = readFileSync(CSV_PATH, "utf-8");
  const lines = csvContent.split("\n").filter((line) => line.trim());

  // Parse header
  const header = parseCSVLine(lines[0]);
  console.log("CSV Headers:", header);

  // Parse data rows
  const pflegedienste = [];
  const slugCounts = new Map(); // Track slug occurrences for deduplication
  const bundeslandMap = new Map(); // Aggregate by Bundesland
  const stadtMap = new Map(); // Aggregate by Stadt

  for (let i = 1; i < lines.length; i++) {
    // Apply limit if specified
    if (LIMIT && pflegedienste.length >= LIMIT) {
      console.log(`Reached limit of ${LIMIT} entries, stopping...`);
      break;
    }

    const values = parseCSVLine(lines[i]);

    if (values.length < 8) continue;

    const [
      companyName,
      email,
      emailType,
      phone,
      website,
      address,
      stadt,
      bundesland,
    ] = values;

    if (!companyName || !bundesland) continue;

    // Parse address to extract street
    const addressParts = parseAddress(address);

    // Use Stadt from CSV, fallback to parsed city from address
    const cityName = stadt || addressParts.city || "Unbekannt";
    const stateName = bundesland || "Unbekannt";

    // Generate slugs
    const bundeslandSlug = slugify(stateName);
    const stadtSlug = slugify(cityName);

    // Generate company slug with city for uniqueness
    let baseSlug = slugify(companyName);
    if (!baseSlug) baseSlug = "pflegedienst";

    // Create unique key for slug deduplication
    const slugKey = `${bundeslandSlug}/${stadtSlug}/${baseSlug}`;
    const count = slugCounts.get(slugKey) || 0;
    slugCounts.set(slugKey, count + 1);

    const finalSlug = count > 0 ? `${baseSlug}-${count + 1}` : baseSlug;

    // Create dienst object
    const dienst = {
      id: `pd-${i}`,
      slug: finalSlug,
      companyName: companyName.trim(),
      email: email ? email.trim() : undefined,
      phone: phone ? phone.trim() : undefined,
      website: website ? website.trim() : undefined,
      address: address ? address.replace(/^"|"$/g, "").trim() : "",
      stadt: cityName,
      stadtSlug,
      bundesland: stateName,
      bundeslandSlug,
    };

    pflegedienste.push(dienst);

    // Aggregate Bundesland data
    if (!bundeslandMap.has(bundeslandSlug)) {
      bundeslandMap.set(bundeslandSlug, {
        name: stateName,
        slug: bundeslandSlug,
        diensteCount: 0,
        staedteSet: new Set(),
      });
    }
    const bl = bundeslandMap.get(bundeslandSlug);
    bl.diensteCount++;
    bl.staedteSet.add(stadtSlug);

    // Aggregate Stadt data
    const stadtKey = `${bundeslandSlug}/${stadtSlug}`;
    if (!stadtMap.has(stadtKey)) {
      stadtMap.set(stadtKey, {
        name: cityName,
        slug: stadtSlug,
        bundesland: stateName,
        bundeslandSlug,
        diensteCount: 0,
      });
    }
    stadtMap.get(stadtKey).diensteCount++;
  }

  console.log(`Parsed ${pflegedienste.length} Pflegedienste`);
  console.log(`Found ${bundeslandMap.size} Bundesländer`);
  console.log(`Found ${stadtMap.size} Städte`);

  // Convert maps to arrays
  const bundeslaender = Array.from(bundeslandMap.values())
    .map((bl) => ({
      name: bl.name,
      slug: bl.slug,
      diensteCount: bl.diensteCount,
      staedteCount: bl.staedteSet.size,
    }))
    .sort((a, b) => b.diensteCount - a.diensteCount);

  const staedte = Array.from(stadtMap.values()).sort(
    (a, b) => b.diensteCount - a.diensteCount,
  );

  // Generate TypeScript file
  const tsContent = `// Auto-generated from pflegedienste_folk_final.csv
// Generated on: ${new Date().toISOString()}
// Do not edit manually - run: node scripts/convert-pflegedienste-csv.js

export interface Pflegedienst {
  id: string;
  slug: string;
  companyName: string;
  email?: string;
  phone?: string;
  website?: string;
  address: string;
  stadt: string;
  stadtSlug: string;
  bundesland: string;
  bundeslandSlug: string;
}

export interface BundeslandData {
  name: string;
  slug: string;
  diensteCount: number;
  staedteCount: number;
}

export interface StadtData {
  name: string;
  slug: string;
  bundesland: string;
  bundeslandSlug: string;
  diensteCount: number;
}

// Main data arrays
export const pflegedienste: Pflegedienst[] = ${JSON.stringify(pflegedienste, null, 2)};

export const bundeslaender: BundeslandData[] = ${JSON.stringify(bundeslaender, null, 2)};

export const staedte: StadtData[] = ${JSON.stringify(staedte, null, 2)};

// Helper functions
export function getPflegedienstBySlug(bundeslandSlug: string, stadtSlug: string, slug: string): Pflegedienst | undefined {
  return pflegedienste.find(
    p => p.bundeslandSlug === bundeslandSlug && p.stadtSlug === stadtSlug && p.slug === slug
  );
}

export function getPflegediensteBundesland(bundeslandSlug: string): Pflegedienst[] {
  return pflegedienste.filter(p => p.bundeslandSlug === bundeslandSlug);
}

export function getPflegedienstStadt(bundeslandSlug: string, stadtSlug: string): Pflegedienst[] {
  return pflegedienste.filter(
    p => p.bundeslandSlug === bundeslandSlug && p.stadtSlug === stadtSlug
  );
}

export function getStaedteByBundesland(bundeslandSlug: string): StadtData[] {
  return staedte.filter(s => s.bundeslandSlug === bundeslandSlug);
}

export function getBundeslandBySlug(slug: string): BundeslandData | undefined {
  return bundeslaender.find(b => b.slug === slug);
}

export function getStadtBySlug(bundeslandSlug: string, stadtSlug: string): StadtData | undefined {
  return staedte.find(s => s.bundeslandSlug === bundeslandSlug && s.slug === stadtSlug);
}
`;

  writeFileSync(OUTPUT_PATH, tsContent, "utf-8");
  console.log(`\nGenerated ${OUTPUT_PATH}`);
  console.log("\nSummary:");
  console.log(`- ${pflegedienste.length} Pflegedienste`);
  console.log(`- ${bundeslaender.length} Bundesländer`);
  console.log(`- ${staedte.length} Städte`);
  console.log("\nTop 5 Bundesländer by count:");
  bundeslaender.slice(0, 5).forEach((bl) => {
    console.log(
      `  ${bl.name}: ${bl.diensteCount} Dienste, ${bl.staedteCount} Städte`,
    );
  });
}

// Run conversion
convertCSV();
