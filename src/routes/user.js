const { Router } = require("express");
const UserController = require("../controllers/user");

const router = Router();

// simple example
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);

module.exports = router;
