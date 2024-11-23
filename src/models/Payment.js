const {Schema, model} = require("mongoose")

const paymentSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      chalet: {
        type: Schema.Types.ObjectId,
        ref: "Chalet",
        required: true,
      },
    },
    {timestamp: true}
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;