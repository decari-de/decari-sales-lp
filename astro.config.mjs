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
      entryLimit: 10000, // Split sitemap for 16k+ pages
      filter: (page) => !page.includes("/404"),
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        // Adjust priority based on page type
        const url = item.url;
        if (url === "https://partner.decari.de/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (url === "https://partner.decari.de/pflegedienste/") {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (url.match(/\/pflegedienste\/[^/]+\/$/)) {
          // Bundesland pages
          item.priority = 0.7;
        } else if (url.match(/\/pflegedienste\/[^/]+\/[^/]+\/$/)) {
          // Stadt pages
          item.priority = 0.5;
        } else if (url.match(/\/pflegedienste\/[^/]+\/[^/]+\/[^/]+\/$/)) {
          // Individual dienst pages
          item.priority = 0.3;
        } else if (url.includes("/blog/")) {
          item.priority = 0.6;
          item.changefreq = "weekly";
        }
        return item;
      },
    }),
  ],
  output: "static",
});
