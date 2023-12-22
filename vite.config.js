import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "./", // each path to a file connected to index.html starts with this
    root: "src", // where index.html is located
    build: {
      outDir: "../dist", // distribution folder
    },
  };
});
