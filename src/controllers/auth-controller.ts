import type { Request, Response, NextFunction } from "express";

import AuthService from "../services/auth-service.js";

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
}

export default new AuthController();
