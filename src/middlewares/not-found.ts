import type { Request, Response, NextFunction } from "express";

function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({
    error: "Route not found.",
  });
}

export default notFound;
