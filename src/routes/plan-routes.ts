import { Router } from "express";
import PlanController from "../controllers/plan-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.post("/", ensureAuthenticated, PlanController.create);
router.get("/", ensureAuthenticated, PlanController.findAll);
router.get("/:id", ensureAuthenticated, PlanController.findById);
router.patch("/:id", ensureAuthenticated, PlanController.updated);
router.patch(
  "/:id/status",
  ensureAuthenticated,
  PlanController.updatePlanStatus,
);

export default router;
