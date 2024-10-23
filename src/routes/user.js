const { Router } = require("express");
const UserController = require("../controllers/user");

const router = Router();

// simple example
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);

module.exports = router;
