const { createOrder, capturePayment } = require("../config/paypal");
const PaymentService = require("../services/payment");

class PaymentController {
  static async makePayment(req, res) {
    try {
      const { chaletTitle, chaletDesc, totalPrice } = req.body;
      const approvalUrl = await createOrder(
        chaletTitle,
        chaletDesc,
        totalPrice
      );

      res.status(201).json({ approvalUrl });
    } catch (err) {
      console.error(`Error while making the payment ${err}`);
      res.status(400).json({ error: "Could not make the payment" });
    }
  }

  static async capturePayment(req, res) {
    try {
      const { token } = req.body;
      const data = await capturePayment(token);
      console.log(data); // You can log the capture result here
      res
        .status(200)
        .json({ message: "Chalet Booked and Payed for successfully" });
    } catch (err) {
      console.error(`Error capturing payment: ${err}`);
      res.status(500).json({ error: "Could not capture the payment" });
    }
  }
}

module.exports = PaymentController;
