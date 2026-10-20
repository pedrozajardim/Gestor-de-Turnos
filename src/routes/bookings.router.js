import { Router } from "express";
import BookingController from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validate.js";
import {
    createBookingSchema,
    bookingIdParamSchema,
    addServiceParamsSchema,
} from "../schemas/booking.schema.js";

const router = Router();

router.get("/", BookingController.getBookings);

router.post("/", validate(createBookingSchema), BookingController.createBooking);

router.get("/:bid", validate(bookingIdParamSchema, "params"), BookingController.getBookingById);

router.post(
    "/:bid/services/:sid",
    validate(addServiceParamsSchema, "params"),
    BookingController.addServiceToBooking
);

export default router;

