import { Router } from "express";
import EnrollmentController from "../controllers/enrollment-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.post("/", ensureAuthenticated, EnrollmentController.create);

router.patch("/:id/cancel", ensureAuthenticated, EnrollmentController.cancel);

router.patch("/:id/suspend", ensureAuthenticated, EnrollmentController.suspend);

router.patch(
  "/:id/reactivate",
  ensureAuthenticated,
  EnrollmentController.reactivate,
);

router.get("/", ensureAuthenticated, EnrollmentController.findAll);
router.get("/:id", ensureAuthenticated, EnrollmentController.findById);

export default router;
