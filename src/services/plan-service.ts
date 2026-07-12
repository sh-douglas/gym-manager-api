import AppError from "../errors/app-error.js";
import { Prisma } from "../generated/prisma/client.js";
import PlanRepository from "../repositories/plan-repository.js";
import {
  createPlanSchema,
  type CreatePlanInput,
} from "../validators/plan-validator.js";

class PlanService {
  async create(data: CreatePlanInput) {
    const parsedData = createPlanSchema.parse(data);
    const normalizedName = parsedData.name.toLowerCase();

    const registeredPlan = await PlanRepository.findByName(normalizedName);

    if (registeredPlan) {
      throw new AppError("Plan already registered.", 409);
    }

    const parsedPrice = new Prisma.Decimal(parsedData.price);

    const createPlanData = {
      name: normalizedName,
      ...(parsedData.description && { description: parsedData.description }),
      price: parsedPrice,
      durationInMonths: parsedData.durationInMonths,
    };

    const plan = await PlanRepository.create(createPlanData);

    return plan;
  }
}

export default new PlanService();
