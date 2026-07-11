import type { Request, Response, NextFunction } from "express";

import AuthService from "../services/auth-service.js";
import AppError from "../errors/app-error.js";

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signUp(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signIn(req.body);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;

      if (!userId) {
        throw new AppError("Unauthorized.", 401);
      }

      const user = await AuthService.me(userId);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
