const {Router} = require("express");
const PaymentController = require("../controllers/payment");
const {authorize} = require("../middlewares/auth");

const router = Router();

// simple example
router.get("/", PaymentController.getPayments);
router.get("/:id", PaymentController.getPaymentsById);

// protected route
router.delete("/:id", authorize(), PaymentController.deletePayment);