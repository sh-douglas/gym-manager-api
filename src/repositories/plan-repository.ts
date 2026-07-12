import type { Prisma } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma.js";

interface CreatePlanRepositoryInput {
  name: string;
  description?: string;
  price: Prisma.Decimal;
  durationInMonths: number;
}

class PlanRepository {
  async create(data: CreatePlanRepositoryInput) {
    return prisma.plan.create({
      data,
    });
  }

  async findByName(name: string) {
    return prisma.plan.findUnique({
      where: { name },
    });
  }
}

export default new PlanRepository();
