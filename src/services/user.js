const User = require("../models/User");

class UserService {
  static async getUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
      console.error(`Error getting users: ${err}`);
      throw err;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (err) {
      console.error(`Error getting user by id: ${err}`);
      throw err;
    }
  }

  static async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (err) {
      console.error(`Error creating user: ${err}`);
      throw err; // Throw the error so it can be handled by the caller
    }
  }
}

module.exports = UserService;
