import BookingsDao from "../dao/bookings.dao.js";

class BookingRepository {
    constructor(dao = new BookingsDao()){
        this.dao = dao
    }

    async create(data) {
        return await this.dao.create(data);
    }
    async getById(id) {
        return await this.dao.getById(id);
    }
    async update(bid,data) {
        return await this.dao.update(bid,data);
    }
}

export default BookingRepository