import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts","src/components/RedSquare.tsx"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: false,
  platform: "browser",
  
});
