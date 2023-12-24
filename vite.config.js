import { defineConfig } from "vite";
import glob from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src", // the root directory (where index.html is located)
    base: "./", // the base of the paths in output directory (what paths in the dist directory are gonna begin with)
    build: {
      sourcemap: true,

      rollupOptions: {
        input: glob.sync("./src/**.html"),
        // input: glob.sync("./src/**/**.html"), if you wanna link all htmls in all folders in the src folder
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: "commonHelpers.js",
        },
      },
      outDir: "../dist", // the output directory (dist folder)
    },
    plugins: [injectHTML(), FullReload(["./src/**/**.html"])],
  };
});
