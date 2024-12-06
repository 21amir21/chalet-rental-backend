const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chaletId: {
      type: Schema.Types.ObjectId,
      ref: "Chalet",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
