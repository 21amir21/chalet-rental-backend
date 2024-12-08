const { Router } = require("express");
const PaymentController = require("../controllers/payment");
const { authorize } = require("../middlewares/auth");

const router = Router();

// simple example
router.get("/", PaymentController.getPayments);
router.get("/:id", PaymentController.getPaymentsById);
router.post("/:id", PaymentController.createPayment);

// protected route
router.delete("/:id", authorize(["admin"]), PaymentController.deletePayment);
router.put("/:id", authorize(["admin"]), PaymentController.updatePayment);

// New part amir

router.post("/pay", PaymentController.makePayment);
router.post("/pay/complete", PaymentController.capturePayment);

module.exports = router;
