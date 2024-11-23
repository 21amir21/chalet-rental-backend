const { Router } = require("express");
const ChaletController = require("../controllers/chalet");
const {
  authenticate,
  authorize,
  checkOwnership,
} = require("../middlewares/auth");

const router = Router();

router.get("/", ChaletController.getChalets);
router.post(
  "/",
  authenticate(),
  authorize(["owner"]),
  ChaletController.createChalet
);
router.put(
  "/:id",
  authenticate(),
  authorize(["owner", "admin"]),
  checkOwnership(),
  ChaletController.updateChalet
);
router.delete(
  "/:id",
  authenticate(),
  authorize(["owner", "admin"]),
  checkOwnership(),
  ChaletController.deleteChalet
);

module.exports = router;
