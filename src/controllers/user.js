const UserService = require("../services/user");

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(`Error getting users in controller: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      res.status(200).json(user);
    } catch (err) {
      console.error(`Error getting user by id in controller: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
