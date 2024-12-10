const Booking = require("../models/Booking");
const User = require("../models/User");
const Chalet = require("../models/Chalet");

class BookingService {
  static async createBooking(bookingData) {
    try {
      const booking = new Booking(bookingData);
      await booking.save();
      return booking;
    } catch (err) {
      throw new Error("could not make booking", err.message);
    }
  }

  static async getTripList(userId) {
    try {
      const trips = await Booking.find({ customerId: userId }).populate(
        "customerId hostId chaletId"
      );
      return trips;
    } catch (err) {
      throw new Error("could not get user trips", err.message);
    }
  }

  static async manageWishList(userId, chaletId) {
    try {
      const user = await User.findById(userId);
      const chalet = await Chalet.findById(chaletId).populate("creator");

      const favoriteListing = user.wishList.find(
        (chalet) => chalet._id.toString() === chaletId
      );

      if (favoriteListing) {
        user.wishList = user.wishList.filter(
          (chalet) => chalet._id.toString() !== chaletId
        );
        await user.save();
        return user.wishList;
      } else {
        user.wishList.push(chalet);
        await user.save();
        return user.wishList;
      }
    } catch (err) {
      throw new Error("could not add chalet to user wishlist", err.message);
    }
  }

  // The following two for OWNERS!
  static async getOwnerProperties(userId) {
    try {
      const properties = await Chalet.find({ creator: userId }).populate(
        "creator"
      );
      return properties;
    } catch (err) {
      throw new Error("could not fetch owner chalets", err.message);
    }
  }

  static async getUserReservations(userId) {
    try {
      const reservations = await Booking.find({ hostId: userId }).populate(
        "customerId hostId chaletId"
      );
      return reservations;
    } catch (err) {
      throw new Error("could fetch owner reservations", err.message);
    }
  }

  static async deleteBooking(bookingId) {
    try {
      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) {
        throw new Error("Chalet not found");
      }
      return booking;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookingService;
