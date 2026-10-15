import crypto from "crypto"
import fs from "fs/promises"


class BookingsDao {
    constructor(path = "./src/data/bookings.json") {
        this.path = path
    }
    async #readBooking() {
        const data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }

    async #writeBooking(bookings) {
        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2))
    }

    async create(data) {
        const bookings = await this.#readBooking();
        const newBooking = { id: crypto.randomUUID(), ...data };
        bookings.push(newBooking)
        await this.#writeBooking(bookings);
        return newBooking
    }
    async getById(id) {
        const booking = await this.#readBooking();
        return booking.find((b) => String(b.id) === String(id) || null)
    }
    async update(id,data) {
        const bookings = await this.#readBooking();
        const index = bookings.findIndex((b) => b.id === id)
        bookings[index] = { ...bookings[index], ...data, id: bookings[index].id };

        await this.#writeBooking(bookings);
        return bookings[index]
    }

}
export default BookingsDao