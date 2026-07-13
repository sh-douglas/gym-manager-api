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

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const plans = await PlanService.findAll();

      return res.status(200).json(plans);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const plan = await PlanService.findById(req.params.id);

      return res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  }

  async updated(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const plan = await PlanService.update(req.params.id, req.body);

      return res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  }
  async updatePlanStatus(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const plan = await PlanService.updatePlanStatus(req.params.id, req.body);

      return res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  }
}

export default new PlanController();
