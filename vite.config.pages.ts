// GitHub Pages only: build this Lovable TanStack Start project as a static SPA.
// The original vite.config.ts is intentionally unchanged for Lovable publishing.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/pixel-perfect-picture-481/",
  },
  nitro: false,
  tanstackStart: {
    spa: { enabled: true },
    server: { entry: "server" },
  },
});
