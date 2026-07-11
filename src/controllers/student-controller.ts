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
}

export default new StudentController();
