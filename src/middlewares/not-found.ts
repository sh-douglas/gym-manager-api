import type { Request, Response, NextFunction } from "express";

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    error: "Route not found.",
  });
}

export default notFound;
