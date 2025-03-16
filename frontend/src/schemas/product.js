import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  price: z
    .number()
    .or(z.string())
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Price must be a valid number")
    .refine((val) => val >= 0, "Price must be greater than or equal to 0")
    .refine((val) => val <= 1000000, "Price must not exceed 1,000,000"),
  discount: z
    .number()
    .or(z.string())
    .transform((val) => parseInt(val) || 0)
    .refine((val) => !isNaN(val), "Discount must be a valid number")
    .refine((val) => val >= 0, "Discount must be greater than or equal to 0")
    .refine((val) => val <= 100, "Discount must not exceed 100"),
  category: z
    .array(z.string())
    .nonempty("At least one category is required"),
  size: z
    .array(z.string())
    .nonempty("At least one size is required"),
  color: z
    .array(z.string())
    .nonempty("At least one color is required"),
  image: z.string().optional(),
  inStock: z.boolean().default(true),
});