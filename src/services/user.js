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
}

module.exports = UserService;
