import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService()

class BookingController {

    static async createBooking(req, res) {
        try {
            const booking = await bookingsService.createBooking(req.body);
            res.status(201).json(booking);

        } catch (error) {
            if (error.message === "Faltan campos por llenar") {
                return res.status(400).json({ error: error.message })
            }
            console.log(error)
            res.status(500).json({ error: "error al querer crear una reserva" })
        }
    }

    static async getBookingById(req, res) {
        try {
            const booking = await bookingsService.getBookingById(req.params.bid)
            res.status(200).json(booking)
        } catch (error) {
            if (error.message === "Reserva no encontrada, revise si el id esta mal escrito.") {
                return res.status(404).json({ error: error.message })
            }
            console.log(error)
            res.status(500).json({ error: "error al querer encontrar una reserva" })
        }
    }

    static async addServiceToBooking(req, res) {
        try {
            const { bid, sid } = req.params;
            const booking = await bookingsService.addServiceToBooking(bid, sid);
            res.status(200).json(booking);
        } catch (error) {
            if(error.message === "Servicio no encontrado, revise si el id de service esta mal escrito."||
                error.message === "Reserva no encontrada, revise si el id de booking esta mal escrito."
            ){
                return res.status(404).json({error: error.message})
            }
            console.log(error)
            res.status(500).json({ error: "error al querer agregar una reserva" })
        }
    }

}

export default BookingController