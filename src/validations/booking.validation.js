import z from "zod"

export const createBookingSchema = z.object({
    clientName : z.string().min(1,"Falta llenar el campo de nombre del cliente"),
    clientEmail : z.email("El email no es válido"),
    date: z.string().min(1,"falta llenar el campo de date"),
    time : z.string().min(1,"falta llenar el campo de  time"),
    status : z.string().min(1,"falta llenar el campo de status").optional(),
    services : z.array(
        z.object({
            service : z.string().regex(/^[0-9a-fA-F]{24}$/, "El id del servicio no es válido"),
            quantity : z.number().int().positive("La cantidad debe ser un número entero mayor a 0").optional()
        })
    ).optional()
});


export const addServiceToBookingSchema = z.object({
    bid: z.string().regex(/^[0-9a-fA-F]{24}$/, "El id de la reserva no es válido" ),
    sid: z.string().regex(/^[0-9a-fA-F]{24}$/, "El id del servicio no es válido")
});