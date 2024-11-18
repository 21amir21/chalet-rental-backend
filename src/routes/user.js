const { Router } = require("express");
const UserController = require("../controllers/user");
const authenticate = require("../middlewares/auth");

const router = Router();

// simple example
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);

// protected route
router.delete("/:id", authenticate(), UserController.deleteUser);
router.put("/:id", authenticate(), UserController.updateUser);

router.post("/signup", UserController.registerUser);
router.post("/login", UserController.login);

module.exports = router;
