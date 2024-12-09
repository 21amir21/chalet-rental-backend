const { Router } = require("express");
const UserController = require("../controllers/user");
const { authenticate } = require("../middlewares/auth");
const upload = require("../utils/uploads");

const router = Router();

// simple example
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);

// protected route
router.delete("/:id", authenticate(), UserController.deleteUser);
router.put(
  "/:id",
  authenticate(),
  upload.single("profileImage"),
  UserController.updateUser
);

// register a new user
router.post(
  "/signup",
  upload.single("profileImage"),
  UserController.registerUser
);
router.post("/login", UserController.login);

module.exports = router;
