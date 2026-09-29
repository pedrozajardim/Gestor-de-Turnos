import BookingController from "../controllers/booking.controller.js";
import {Router } from "express";

const router = Router();


router.post("/", BookingController.createBooking)

router.get("/:bid", BookingController.getBookingById )

router.post("/:bid/services/:sid", BookingController.addServiceToBooking)

export default router