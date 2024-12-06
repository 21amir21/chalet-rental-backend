const { Router } = require("express");
const BookingController = require("../controllers/booking");

const router = Router();

router.post("/", BookingController.createBooking);

router.get("/:userId/trips", BookingController.getTripList);

router.patch("/:userId/:chaletId", BookingController.manageWishLisht);

router.get("/:userId/properties", BookingController.getOwnerProperties);

router.get("/:userId/reservations", BookingController.getUserReservations);

module.exports = router;
