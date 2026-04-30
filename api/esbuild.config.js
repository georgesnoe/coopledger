import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  target: "node22",
  outfile: "dist/server.cjs",
  format: "cjs",
  external: [
    "@neondatabase/serverless",
    "better-auth",
    "bullmq",
    "drizzle-orm/neon-http",
    "drizzle-orm",
  ],
  sourcemap: true,
  minify: false,
});

console.log("Bundled into dist/server.cjs");