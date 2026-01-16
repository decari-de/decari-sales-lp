import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// Für GitHub Pages Preview: base hinzufügen
// Für Custom Domain (pflegedienste.decari.de): base entfernen
export default defineConfig({
  site: "https://decari-de.github.io",
  base: "/decari-sales-lp/",
  trailingSlash: "always",
  integrations: [tailwind()],
  output: "static",
});
