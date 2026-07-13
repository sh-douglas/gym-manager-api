import type { Prisma } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma.js";

interface CreatePlanRepositoryInput {
  name: string;
  description?: string;
  price: Prisma.Decimal;
  durationInMonths: number;
}

interface UpdatePlanRepositoryInput {
  name?: string;
  description?: string;
  price?: Prisma.Decimal;
  durationInMonths?: number;
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

  async findAll() {
    return prisma.plan.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdatePlanRepositoryInput) {
    return prisma.plan.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, isActive: boolean) {
    return prisma.plan.update({
      where: { id },
      data: {
        isActive,
      },
    });
  }
}

export default new PlanRepository();
