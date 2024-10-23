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
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      console.error(`Error getting user by its id: ${err}`);
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

  static async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      console.error(`Error deleting user: ${err}`);
      throw err;
    }
  }

  static async updateUser(userId, updatedUserData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUserData);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      console.error(`Error updating user: ${err}`);
      throw err;
    }
  }
}

module.exports = UserService;
