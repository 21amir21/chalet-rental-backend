const UserService = require("../services/user");
const { generateToken } = require("../utils/jwt");

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

  static async registerUser(req, res) {
    try {
      // extract the user data from the req body
      const userData = req.body;

      // the uploaded file is in the req.file
      const profileImage = req.file;
      const profileImagePath = profileImage.path;

      // add this profileImagePath to the userData object
      userData.profileImagePath = profileImagePath;

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

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.checkCredentials(email, password);
      if (user) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Login Successfull!",
          jwt: token,
          userId: user._id,
          userType: user.userType,
        });
      } else {
        res.status(401).json({ messsage: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
}

module.exports = UserController;
