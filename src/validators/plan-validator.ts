import { z } from "zod";

const createPlanSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "The name field must contain at least 3 characters."),
  description: z.string().trim().min(1).max(500).optional(),
  price: z
    .string()
    .trim()
    .min(1, "Price cannot be empty")
    .regex(/^(0|[1-9]\d{0,7})(\.\d{1,2})?$/, {
      message:
        "Must be a positive decimal number with up to 8 integer digits and 2 decimal places",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Price must be greater than zero",
    }),
  durationInMonths: z
    .number()
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 month"),
});

type CreatePlanInput = z.infer<typeof createPlanSchema>;

export { createPlanSchema, type CreatePlanInput };
