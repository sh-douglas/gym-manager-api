import { Router } from "express";
import EnrollmentController from "../controllers/enrollment-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.post("/", ensureAuthenticated, EnrollmentController.create);

export default router;
