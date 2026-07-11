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

const updateStudentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "The name field must contain at least 3 characters.")
      .optional(),
    email: z.string().trim().email("The email field must be valid.").optional(),
    phone: z.string().trim().e164().optional(),
    birthDate: z
      .string()
      .date("The date must be in YYYY-MM-DD format.")
      .refine((val) => new Date(val) <= new Date(), {
        message: "The birth date cannot be in the future.",
      })
      .optional(),
  })
  .refine(
    (data) => {
      const fields = Object.keys(data).filter(
        (key) => data[key as keyof typeof data] !== undefined,
      );
      return fields.length > 0;
    },
    {
      message: "At least one field must be provided for updating.",
      path: [],
    },
  );

const updateStudentStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]),
});

type CreateStudentInput = z.infer<typeof createStudentSchema>;
type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
type UpdateStudentStatusInput = z.infer<typeof updateStudentStatusSchema>;

export {
  createStudentSchema,
  type CreateStudentInput,
  updateStudentSchema,
  type UpdateStudentInput,
  updateStudentStatusSchema,
  type UpdateStudentStatusInput,
};
