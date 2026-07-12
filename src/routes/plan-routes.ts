import { Router } from "express";
import PlanController from "../controllers/plan-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.post("/", ensureAuthenticated, PlanController.create);

export default router;
