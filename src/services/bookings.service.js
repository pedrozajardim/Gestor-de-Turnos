import BookingRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";


class BookingsService {
    constructor(
        repository = new BookingRepository(),
        serviceRepository = new ServicesRepository()
    ) {
        this.repository = repository;
        this.serviceRepository = serviceRepository;
    }


    async createBooking(data) {
        const { clientName, clientEmail, date, time } = data || {};

        if (!clientName, !clientEmail, !date, !time) {
            throw new Error("Faltan campos por llenar")
        }
        return await this.repository.create({
            clientName,
            clientEmail,
            date,
            time,
            status: "pending",
            services: [],
        })
    }

    async getBookingById(id) {
        const booking = await this.repository.getById(id);
        if (!booking) {
            throw new Error("Reserva no encontrada, revise si el id esta mal escrito.")
        }
        return booking
    }

    async addServiceToBooking(bid, sid) {
        const booking = await this.repository.getById(bid);
        if (!booking) {
            throw new Error("Reserva no encontrada, revise si el id de booking esta mal escrito.")
        };

        const service = await this.serviceRepository.getById(sid)
        if (!service) {
            throw new Error("Servicio no encontrado, revise si el id de service esta mal escrito.");
        }
        const existingService = booking.services.find(s => s.service === sid)

        if (existingService) {
            existingService.quantity += 1;
        } else {
            booking.services.push({ service: sid, quantity: 1 })
        }

        return await this.repository.update(bid, { services: booking.services });
    }
}

export default BookingsService