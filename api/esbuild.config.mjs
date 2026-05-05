import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  target: "node22",
  outfile: "dist/server.mjs",
  format: "esm",
  packages: "external",
  sourcemap: false,
  minify: true,
});

console.log("Bundled into dist/server.mjs");
