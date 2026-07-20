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

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const enrollments = await EnrollmentService.findAll();

      return res.status(200).json(enrollments);
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
      const enrollment = await EnrollmentService.findById(req.params.id);

      return res.status(200).json(enrollment);
    } catch (error) {
      next(error);
    }
  }

  async cancel(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const enrollment = await EnrollmentService.cancel(req.params.id);

      return res.status(200).json(enrollment);
    } catch (error) {
      next(error);
    }
  }

  async suspend(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const enrollment = await EnrollmentService.suspend(req.params.id);

      return res.status(200).json(enrollment);
    } catch (error) {
      next(error);
    }
  }

  async reactivate(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const enrollment = await EnrollmentService.reactivate(req.params.id);

      return res.status(200).json(enrollment);
    } catch (error) {
      next(error);
    }
  }
}

export default new EnrollmentController();
