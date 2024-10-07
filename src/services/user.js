const User = require("../models/user");

class UserService {
  static async getUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
      console.error(`Error getting users services: ${err}`);
      throw err;
    }
  }
}

module.exports = UserService;
