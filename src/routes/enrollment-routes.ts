import { Router } from "express";
import EnrollmentController from "../controllers/enrollment-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.post("/", ensureAuthenticated, EnrollmentController.create);

router.patch(
  "/:id/status",
  ensureAuthenticated,
  EnrollmentController.updateStatus,
);

router.get("/", ensureAuthenticated, EnrollmentController.findAll);
router.get("/:id", ensureAuthenticated, EnrollmentController.findById);

export default router;
