import ServicesService from "../services/services.service.js";
import BookingsService from "../services/bookings.service.js";

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

const toPlain = (item) => (item.toObject ? item.toObject() : item);

export const renderServices = async (req, res) => {
    try {
        const result = await servicesService.getServices();
        const services = result.docs ?? result;
        res.render("services", { services: services.map(toPlain) });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar los servicios");
    }
};

export const renderBookings = async (req, res) => {
    try {
        const result = await bookingsService.getBookings();
        const bookings = result.docs ?? result;
        res.render("bookings", { bookings: bookings.map(toPlain) });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar las reservas");
    }
};