import { defineConfig } from "vite";
import zipPack from "vite-plugin-zip-pack";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [{
    name: "copy-assets",
    async generateBundle() {
      const files = [
        "./manifest.json",
        "webcat/hooks/content.js",
        "webcat/data/block.json",
        "webcat/data/list.json",
        "webcat/icons/dark/webcat.SVG",
        "webcat/icons/dark/webcat-ok.SVG",
        "webcat/icons/dark/webcat-error.SVG",
        "webcat/icons/light/webcat.SVG",
        "webcat/icons/light/webcat-ok.SVG",
        "webcat/icons/light/webcat-error.SVG",
        "webcat/pages/error.html",
        "webcat/pages/error.css",
        "webcat/pages/error.js",
      ];
      for (const file of files) {
        const url = import.meta.resolve(file);
        this.emitFile({
          type: "asset",
          fileName: file.replace(/^\.\//, ""),
          source: readFileSync(fileURLToPath(url)),
        });
      }
    }
  }, zipPack({ outDir: "dist" })],
  build: {
    minify: false,
    target: "es2020",
    outDir: "dist",
    rolldownOptions: {
      input: {
        main: "background.ts",
      },
      output: {
        entryFileNames: "background.js",
        format: "es",
      }
    },
  },
});
