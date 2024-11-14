const UserService = require("../services/user");

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(`Error getting users: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      res.status(200).json(user);
    } catch (err) {
      console.error(`Error getting user by id: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await UserService.createUser(userData);
      res.status(201).json({
        message: `User was created successfully!`,
      });
    } catch (err) {
      console.error(`Error creating user: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.deleteUser(userId);
      res.status(200).json({
        message: `Successfully deleted user of id ${user._id} and name ${user.name}`,
      });
    } catch (err) {
      console.error(`Error deleting user: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
      const user = await UserService.updateUser(userId, updatedUser);
      res.status(200).json({
        message: `Successfully updated user of id ${user._id}`,
      });
    } catch (err) {
      console.error(`Error updating user ${user._id}: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;
