const { Router } = require("express");
const UserController = require("../controllers/user");

const router = Router();

// simple example
router.get("/", UserController.getUsers);

module.exports = router;