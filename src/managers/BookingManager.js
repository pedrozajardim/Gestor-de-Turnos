import crypto from "crypto"
import fs from "fs/promises"



class BookingManager {
    constructor(path) {
        this.path = path
    }

    async #readBooking() {
        const data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }

    async #writeBooking(bookings) {
        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2))
    }

    async createBooking({ clientName, clientEmail, date, time, status="pending", services = [] }) {
        const booking = await this.#readBooking();
        const newBooking = {
            id: crypto.randomUUID(), clientName, clientEmail, date, time, status, services
        }
        booking.push(newBooking)
        await this.#writeBooking(booking);
        return newBooking
    }

    async getBookingById(id) {
        const booking = await this.#readBooking();
        return booking.find(b => b.id === id)
    }

    async addServiceToBooking(bid, sid) {
        const bookings = await this.#readBooking();
        const booking = bookings.find(b => b.id === bid)

        if (!booking) { return null };

        const existingService = booking.services.find(s => s.service === sid)

        if (existingService) {
            existingService.quantity += 1;
        } else {
            booking.services.push({ service: sid, quantity: 1 })
        }
        await this.#writeBooking(bookings);
        return booking
    }
}

export default BookingManager