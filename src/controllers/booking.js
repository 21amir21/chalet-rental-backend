const BookingService = require("../services/booking");

class BookingController {
  static async createBooking(req, res) {
    try {
      const bookingData = req.body;
      const booking = await BookingService.createBooking(bookingData);
      res.status(200).json({ message: "Booking was created successfully!" });
    } catch (err) {
      console.error(`Error creating booking: ${err}`);
      res.status(500).json({ error: "Interna Server error" });
    }
  }

  static async getTripList(req, res) {
    try {
      const { userId } = req.params;
      const trips = await BookingService.getTripList(userId);
      res.status(200).json(trips);
    } catch (err) {
      console.error(`Error while fetching user trips ${err}`);
      res
        .status(404)
        .json({ message: "Can not find trips!", error: err.message });
    }
  }

  static async manageWishLisht(req, res) {
    try {
      const { userId, chaletId } = req.params;
      const wishList = await BookingService.manageWishList(userId, chaletId);
      res.status(200).json({
        message: "Chalet is added or removed to wish list successfully",
        wishList: wishList,
      });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async getOwnerProperties(req, res) {
    try {
      const { userId } = req.params;
      const properties = await BookingService.getOwnerProperties(userId);
      res.status(200).json(properties);
    } catch (err) {
      res
        .status(404)
        .json({ message: "Can not find properties!", error: err.message });
    }
  }

  static async getUserReservations(req, res) {
    try {
      const { userId } = req.params;
      const reservations = await BookingService.getUserReservations(userId);
      res.status(200).json(reservations);
    } catch (err) {
      res
        .status(404)
        .json({ message: "Can not find reservations!", error: err.message });
    }
  }
}

module.exports = BookingController;
