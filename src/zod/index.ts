import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.date().or(z.string()),
});

export type UserFormType = z.infer<typeof userSchema>;

export const addressSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  district: z.string(),
  province: z.string(),
  ward: z.string(),
  specify: z.string(),
});

export type AddressType = z.infer<typeof addressSchema>;

export const productSchema = (type: "create" | "update") =>
  z.object({
    name: z.string(),
    description: z.string(),
    avatar:
      type === "create"
        ? z.instanceof(FileList, { message: "Avatar is required" })
        : z.instanceof(FileList).or(z.string()),
    images:
      type === "create"
        ? z.instanceof(FileList, { message: "Product images are required" })
        : z.instanceof(FileList).optional().or(z.array(z.string()).optional()),
    categoryId: z.string(),
    brandId: z.string(),
    price: z.coerce.number().positive("Price must be a positive number"),
    productColorId: z.string(),
  });

export type ProductFormType = z.infer<ReturnType<typeof productSchema>>;

export const productItemSchema = z.object({
  id: z.number().optional(),
  quantity: z.coerce.number().positive(),
  productSizeId: z.string(),
});

export type ProductItemType = z.infer<typeof productItemSchema>;

export const searchSchema = z.object({
  keyword: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  color: z.array(z.string()).optional(),
  size: z.array(z.string()).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

export type SearchType = z.infer<typeof searchSchema>;

export const categorySchema = z.object({
  name: z.string(),
  image: z.instanceof(FileList).or(z.string()),
});

export type CategoryFormType = z.infer<typeof categorySchema>;

export const brandSchema = z.object({
  name: z.string(),
});

export type BrandFormType = z.infer<typeof categorySchema>;

export const configSchema = z.object({
  id: z.number().optional(),
  value: z.string(),
});

export type ConfigFormType = z.infer<typeof configSchema>;
