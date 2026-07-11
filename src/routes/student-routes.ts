import { Router } from "express";
import StudentController from "../controllers/student-controller.js";
import ensureAuthenticated from "../middlewares/ensure-authenticated.js";

const router = Router();

router.get("/", ensureAuthenticated, StudentController.findAll);
router.get("/:id", ensureAuthenticated, StudentController.findById);
router.patch("/:id", ensureAuthenticated, StudentController.updateStudent);
router.patch(
  "/:id/status",
  ensureAuthenticated,
  StudentController.updateStudentStatus,
);
router.post("/", ensureAuthenticated, StudentController.create);

export default router;
