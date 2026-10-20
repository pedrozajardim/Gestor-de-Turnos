import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido");

export const bookingIdParamSchema = z.object({ bid: objectId });

export const addServiceParamsSchema = z.object({
    bid: objectId,
    sid: objectId,
});

export const createBookingSchema = z.object({
    clientName: z.string().trim().min(2, "clientName debe tener al menos 2 caracteres"),
    clientEmail: z.string().email("Email inválido"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date debe ser YYYY-MM-DD"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "time debe ser HH:mm"),
});