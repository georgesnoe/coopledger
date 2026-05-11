import { z } from "zod/mini";

const envSchema = z.object({
  NODE_ENV: z._default(
    z.enum(["development", "test", "production"]),
    "development",
  ),
  API_BASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables");
  console.error(_env.error.issues.map((issue) => issue.message).join("\n"));
  process.exit(1);
}

export const env = _env.data;
