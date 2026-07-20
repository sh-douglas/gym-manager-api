import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  JWT_SECRET: z
    .string()
    .trim()
    .min(16, "JWT_SECRET must be at least 16 characters long"),
  JWT_EXPIRES_IN: z.enum(["15m", "30m", "1h", "2h", "12h", "1d", "7d"]),
  POSTGRES_USER: z.string().trim().min(1, "POSTGRES_USER is required"),
  POSTGRES_PASSWORD: z.string().trim().min(1, "POSTGRES_PASSWORD is required"),
  POSTGRES_DB: z.string().trim().min(1, "POSTGRES_DB is required"),
  POSTGRES_PORT: z.coerce.number().int().positive().default(5432),
  DATABASE_URL: z
    .string()
    .trim()
    .url()
    .startsWith(
      "postgresql://",
      "DATABASE_URL must be a valid postgresql connection string",
    ),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

export const env = parsedEnv.data;
