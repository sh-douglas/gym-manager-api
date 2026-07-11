import { z } from "zod";

const createStudentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "The name field must contain at least 3 characters."),
  email: z.string().trim().email("The email field must be valid."),
  phone: z.string().trim().e164().optional(),
  document: z
    .string()
    .trim()
    .length(11, "The document must be exactly 11 characters.")
    .regex(/^\d{11}$/, "The document must contain only numbers."),
  birthDate: z
    .string()
    .date("The date must be in YYYY-MM-DD format.")
    .refine((val) => new Date(val) <= new Date(), {
      message: "The birth date cannot be in the future.",
    }),
});

type CreateStudentInput = z.infer<typeof createStudentSchema>;

export { createStudentSchema, type CreateStudentInput };
