import type { Request, Response, NextFunction } from "express";

import StudentService from "../services/student-service.js";

class StudentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await StudentService.create(req.body);

      return res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await StudentService.findAll();

      return res.status(200).json(students);
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
      const student = await StudentService.findById(req.params.id);

      return res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  async updateStudent(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const student = await StudentService.updateStudent(
        req.params.id,
        req.body,
      );

      return res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
