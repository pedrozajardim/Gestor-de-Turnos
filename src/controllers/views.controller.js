import ServicesService from "../services/services.service.js";
import BookingsService from "../services/bookings.service.js";

const servicesService = new ServicesService();

export const renderServices = async (req, res) => {
    try {
const services = await servicesService.getServices();
const plainServices = services.map(s => s.toObject ? s.toObject() : s);
res.render("services", { services: plainServices });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar los servicios");
    }
};

const bookingsService = new BookingsService();

export const renderBookings = async (req, res) => {
    try {
        const bookings = await bookingsService.getBookings();
        const plainBookings = bookings.map(b => b.toObject ? b.toObject() : b);
        res.render("bookings", { bookings: plainBookings });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar las reservas");
    }
};