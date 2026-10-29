import z from "zod";

export const createServiceSchema = z.object({
    name: z.string().min(1, "Es obligatorio escribir el nombre"),
    description: z.string().min(1, "Es obligatorio escribir la descripción"),
    duration: z.string().min(1, "Es obligatorio escribir la duración"),
    price: z.number().positive("El precio debe ser mayor a 0"),
    category: z.string().min(1, "Es obligatorio escribir la categoria"),
    available: z.boolean().optional()

});

export const updateServiceSchema = createServiceSchema.partial()