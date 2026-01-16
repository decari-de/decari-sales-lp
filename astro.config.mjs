import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://pflegedienste.decari.de",
  integrations: [tailwind()],
  output: "static",
});
