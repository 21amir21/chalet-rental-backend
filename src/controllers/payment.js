const { createOrder, capturePayment } = require("../config/paypal");
const PaymentService = require("../services/payment");

class PaymentController {
  static async getPayments(req, res) {
    try {
      const payments = await PaymentService.getPayments();
      res.status(200).json(payments);
    } catch (err) {
      console.error(`Error getting payments1: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getPaymentsById(req, res) {
    try {
      const paymentId = req.params.id;
      const payment = await PaymentService.getPaymentById(paymentId);
      res.status(200).json(payment);
    } catch (err) {
      console.error(`Error getting payments2: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createPayment(req, res) {
    try {
      const paymentData = req.body;
      const payment = await PaymentService.createPayment(paymentData);
      res.status(201).json({
        message: `Payment was created successfully!`,
      });
    } catch (err) {
      console.error(`Error getting payments3: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deletePayment(req, res) {
    try {
      const paymentId = req.params.id;
      const payment = await PaymentService.deletePayment(paymentId);
      res.status(200).json({
        message: `Successfully deleted payment of id ${payment._id}`,
      });
    } catch (err) {
      console.error(`Error getting payments4: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updatePayment(req, res) {
    try {
      const paymentId = req.params.id;
      const updatedPayment = req.body;
      const payment = await PaymentService.updatePayment(
        paymentId,
        updatedPayment
      );
      res.status(200).json({
        message: `Successfully updated payment of id ${payment._id}`,
      });
    } catch (err) {
      console.error(`Error getting payments5: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // TODO: amir new payment / remove later

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
