import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// Custom Domain: partner.decari.de
export default defineConfig({
  site: "https://partner.decari.de",
  trailingSlash: "always",
  integrations: [tailwind()],
  output: "static",
});
