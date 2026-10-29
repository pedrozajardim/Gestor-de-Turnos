import BookingController from "../controllers/booking.controller.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createBookingSchema, addServiceToBookingSchema } from "../validations/booking.validation.js";

const router = Router();

router.get("/", BookingController.getBookings)

router.post("/", validate(createBookingSchema), BookingController.createBooking)

router.get("/:bid", BookingController.getBookingById)

router.post("/:bid/services/:sid", validate(addServiceToBookingSchema, "params"), BookingController.addServiceToBooking)

export default router