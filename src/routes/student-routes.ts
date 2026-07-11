import { Router } from "express";
import StudentController from "../controllers/student-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.get("/", ensureAuthenticated, StudentController.findAll);
router.post("/", ensureAuthenticated, StudentController.create);

export default router;
