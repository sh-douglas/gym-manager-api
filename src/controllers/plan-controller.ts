import type { Request, Response, NextFunction } from "express";
import PlanService from "../services/plan-service.js";

class PlanController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const plan = await PlanService.create(req.body);

      return res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  }
}

export default new PlanController();
