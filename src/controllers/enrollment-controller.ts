import type { Request, Response, NextFunction } from "express";

import EnrollmentService from "../services/enrollment-service.js";

class EnrollmentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const enrollment = await EnrollmentService.create(req.body);

      return res.status(201).json(enrollment);
    } catch (error) {
      next(error);
    }
  }
}

export default new EnrollmentController();
