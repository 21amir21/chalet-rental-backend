const { Router } = require("express");
const PaymentController = require("../controllers/payment");

const router = Router();

// simple example
// router.get("/", PaymentController.getPayments);
// router.get("/:id", PaymentController.getPaymentsById);
// router.post("/:id", PaymentController.createPayment);

// // protected route
// router.delete("/:id", authorize(["admin"]), PaymentController.deletePayment);
// router.put("/:id", authorize(["admin"]), PaymentController.updatePayment);

// New part amir

router.post("/pay", PaymentController.makePayment);
router.post("/complete", PaymentController.capturePayment);

module.exports = router;
