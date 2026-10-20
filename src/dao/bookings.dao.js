import { BookingModel } from "./models/booking.model.js";

class BookingsDao {

    async getAll(){
        return await BookingModel.find();
    }

    async create(data) {
        return await BookingModel.create(data);
    }

    async getById(id) {
        return await BookingModel.findById(id);
    }

    async update(id, data) {
        return await BookingModel.findByIdAndUpdate(id, data, { new: true });
    }
}

export default BookingsDao;