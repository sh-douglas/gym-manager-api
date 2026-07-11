import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/app-error.js";
import { env } from "../config/env.js";
import UserRepository from "../repositories/user-repositories.js";

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header) {
    next(new AppError("Unauthorized.", 401));
    return;
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer") {
    next(new AppError("Unauthorized.", 401));
    return;
  }

  if (!token) {
    next(new AppError("Unauthorized.", 401));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (typeof decoded === "string") {
      next(new AppError("Invalid or expired token", 401));
      return;
    }

    if (!decoded.sub) {
      next(new AppError("Invalid or expired token", 401));
      return;
    }

    const sub = decoded.sub;

    const user = await UserRepository.findById(sub);

    if (!user) {
      next(new AppError("Invalid or expired token", 401));
      return;
    }

    req.userId = user.id;

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
    console.error(error);
  }
}

export default ensureAuthenticated;
