import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Custom Domain: partner.decari.de
export default defineConfig({
  site: "https://partner.decari.de",
  trailingSlash: "always",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  output: "static",
});
