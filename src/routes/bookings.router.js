
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";
import { json, Router } from "express";

const router = Router();

const serviceManager = new ServiceManager("./src/data/services.json")
const bookingManager = new BookingManager("./src/data/bookings.json")

router.post("/", async (req, res) => {
    try {
        const { clientName, clientEmail, date, time, services } = req.body

        if (!clientName || !clientEmail || !date || !time) {
            return res.status(400).json({ error: "Faltan campos obligatorios" })
        }
        const booking = await bookingManager.createBooking({ clientName, clientEmail, date, time, services })
        res.status(201).json(booking)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "error al querer crear una reserva" })
    }
})

router.get("/:bid", async (req, res) => {
    try {
        const booking = await bookingManager.getBookingById(req.params.bid)
        if (!booking) {
            return res.status(404).json({ error: 'reserva no encontrada' })
        }
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).json({ error: "error al querer encontrar una reserva" })
    }
})

router.post("/:bid/services/:sid", async (req, res) => {
    try {
        const { bid, sid } = req.params;

        const service = await serviceManager.getServiceById(sid)
        if (!service) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        const booking = await bookingManager.addServiceToBooking(bid, sid);
        if (!booking) {
            return res.status(404).json({ error: "Reserva o servicio no encontrado" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: "error al querer agregar una reserva" })
    }
})

export default router