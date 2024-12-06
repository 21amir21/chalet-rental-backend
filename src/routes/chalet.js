const { Router } = require("express");
const ChaletController = require("../controllers/chalet");
const {
  authenticate,
  authorize,
  checkOwnership,
} = require("../middlewares/auth");
const upload = require("../utils/uploads");

const router = Router();

router.get("/", ChaletController.getChalets);
router.post(
  "/",
  authenticate(),
  authorize(["owner"]),
  upload.array("listingPhotos"),
  ChaletController.createChalet
);
router.get("/:id", ChaletController.getChaletById);
router.get("/search/:search", ChaletController.getChaletsBySearch);
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
