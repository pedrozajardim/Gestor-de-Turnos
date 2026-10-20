import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().trim().min(1, "description es obligatoria"),
    duration: z.string().trim().min(1, "duration es obligatoria"),
    price: z.number({ invalid_type_error: "price debe ser un número" }).positive("price debe ser mayor a 0"),
    category: z.string().trim().min(1, "category es obligatoria"),
    available: z.boolean().optional(),
});

export const updateServiceSchema = createServiceSchema
    .partial()
    .refine((d) => Object.keys(d).length > 0, {
        message: "Enviá al menos un campo para actualizar",
    });

export const listServicesQuerySchema = z.object({
    category: z.string().trim().min(1).optional(),
    available: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
    sortBy: z.enum(["name", "price", "category", "createdAt"]).default("name"),
    order: z.enum(["asc", "desc"]).default("asc"),
});