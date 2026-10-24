import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(09|\+2519)\d{8}$/, "Phone must start with 09 or +2519"),
  area: z.string().min(1, "Please select a neighbourhood"),
  total: z.number().min(0),
  notes: z.string().optional(),
});
