import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  price: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z.number()
        .min(0, "Price must be greater than or equal to 0")
        .max(1000000, "Price must not exceed 1,000,000")
    ),
  discount: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z.number()
        .min(0, "Discount must be greater than or equal to 0")
        .max(100, "Discount must not exceed 100")
    ),
  category: z
    .array(z.string())
    .min(1, "At least one category is required"),
  size: z
    .array(z.string())
    .min(1, "At least one size is required"),
  color: z
    .array(z.string())
    .min(1, "At least one color is required"),
  image: z.string().optional(),
  inStock: z.boolean().default(true),
});