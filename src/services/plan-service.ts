import AppError from "../errors/app-error.js";
import { Prisma } from "../generated/prisma/client.js";
import PlanRepository from "../repositories/plan-repository.js";
import {
  createPlanSchema,
  updatePlanSchema,
  type CreatePlanInput,
  type UpdatePlanInput,
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

  async findAll() {
    const plans = PlanRepository.findAll();

    return plans;
  }

  async findById(id: string) {
    const plan = await PlanRepository.findById(id);

    if (!plan) {
      throw new AppError("Plan not found.", 404);
    }

    return plan;
  }

  async update(id: string, data: UpdatePlanInput) {
    const parsedData = updatePlanSchema.parse(data);
    const registeredPlan = await PlanRepository.findById(id);

    if (!registeredPlan) {
      throw new AppError("Plan not found.", 404);
    }

    let normalizedName: string | undefined;

    if (parsedData.name) {
      normalizedName = parsedData.name.toLowerCase();

      const planByName = await PlanRepository.findByName(normalizedName);

      if (planByName && planByName.id !== id) {
        throw new AppError("Plan already registered.", 409);
      }
    }

    let parsedPrice: Prisma.Decimal | undefined;

    if (parsedData.price) {
      parsedPrice = new Prisma.Decimal(parsedData.price);
    }

    const updatePlanData = {
      ...(normalizedName && { name: normalizedName }),
      ...(parsedData.description && { description: parsedData.description }),
      ...(parsedPrice && { price: parsedPrice }),
      ...(parsedData.durationInMonths && {
        durationInMonths: parsedData.durationInMonths,
      }),
    };

    const updatedPlan = await PlanRepository.update(id, updatePlanData);

    return updatedPlan;
  }
}

export default new PlanService();
