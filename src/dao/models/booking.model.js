import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    clientName: String,
    clientEmail: String,
    date: String,
    time: String,
    status: String,
    services: [
        {
            _id: false,
            service: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
            quantity: { type: Number, min: 1, default: 1 },
        },
    ],
});

export const BookingModel = mongoose.model("Booking", bookingSchema);
