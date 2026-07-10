import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js";

const client = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaPg(client);
const prisma = new PrismaClient({ adapter });

export default prisma;
