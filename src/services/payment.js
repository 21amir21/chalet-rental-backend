const Payment = require("../models/Payment");
const User = require("../models/User");

class PaymentService {
  static async getPayments() {
    try {
      const payments = await Payment.find();
      return payments;
    } catch (err) {
      throw err;
    }
  }

  static async getPaymentById(paymentId) {
    try {
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error("Payment not found");
      }
      return payment;
    } catch (err) {
      throw err;
    }
  }

  static async createPayment(paymentData) {
    try {
      const payment = new Payment(paymentData);
      await payment.save();
      return payment;
    } catch (err) {
      throw err;
    }
  }

  static async deletePayment(paymentId) {
    try {
      const payment = await Payment.findByIdAndDelete(paymentId);
      if (!payment) {
        throw new Error("Payment not found");
      }
      return payment;
    } catch (err) {
      throw err;
    }
  }

  static async updatePayment(paymentId, updatedPaymentData) {
    try {
      const payment = await Payment.findByIdAndUpdate(paymentId, updatedPaymentData);
      if (!payment) {
        throw new Error("Payment not found");
      }
      return payment;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PaymentService;