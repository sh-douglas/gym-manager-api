import { Router } from "express";
import StudentController from "../controllers/student-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.post("/", ensureAuthenticated, StudentController.create);

export default router;
