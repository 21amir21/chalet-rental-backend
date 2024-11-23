const PaymentService = require("../services/payment");

class PaymentController {
  static async getPayments(req, res) {
    try {
      const payments = await PaymentService.getPayments();
      res.status(200).json(payments);
    } catch (err) {
      console.error(`Error getting payments: ${err}`);
      res.status(500).json({error: "Internal server error"});
    }
  }

  static async getPaymentsById(req, res) {
    try {
      const paymentId = req.params.id;
      const payment = await PaymentService.getPaymentById(paymentId);
      res.status(200).json(payment);
    } catch (err) {
      console.error(`Error getting payments: ${err}`);
      res.status(500).json({error: "Internal server error"});
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
      console.error(`Error getting payments: ${err}`);
      res.status(500).json({error: "Internal server error"});
    }
  }

  static async deletePayment(req, res) {
    try {
      const paymentId = req.params.id;
      const payment = await PaymentService.deletePayment(paymentId);
      res.status(200).json({
        message: `Successfully deleted payment of id ${payment._id}`
      })
    } catch (err) {
      console.error(`Error getting payments: ${err}`);
      res.status(500).json({error: "Internal server error"});
    }
  }

  static async updatePayment(req, res) {
    try {
      const paymentId = req.params.id;
      const updatedPayment = req.body;
      const payment = await PaymentService.updatePayment(paymentId, updatedPayment);
      res.status(200).json({
        message: `Successfully updated payment of id ${payment._id}`,
      });
    } catch (err) {
      console.error(`Error getting payments: ${err}`);
      res.status(500).json({error: "Internal server error"});
    }
  }
}

module.exports = PaymentController;