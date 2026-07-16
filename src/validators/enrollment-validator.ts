import { z } from "zod";
import { EnrollmentStatus } from "../generated/prisma/enums.js";

const createEnrollmentSchema = z.object({
  studentId: z.uuid(),
  planId: z.uuid(),
  startDate: z
    .string()
    .date()
    .refine(
      (value) => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        const today = `${year}-${month}-${day}`;

        return value <= today;
      },
      {
        message: "The start date cannot be in the future.",
      },
    ),
});

const updateEnrollmentStatusSchema = z.object({
  status: z.enum(EnrollmentStatus),
});

type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
type UpdateEnrollmentStatusInput = z.infer<typeof updateEnrollmentStatusSchema>;

export {
  createEnrollmentSchema,
  type CreateEnrollmentInput,
  updateEnrollmentStatusSchema,
  type UpdateEnrollmentStatusInput,
};
