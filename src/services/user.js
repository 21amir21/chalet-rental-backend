const User = require("../models/User");

const bcrypt = require("bcrypt");

class UserService {
  // TODO Might be deleted!
  // or actually no, because admins can get all the users
  // if we wanna make it that way
  static async getUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (err) {
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
      throw err;
    }
  }

  static async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 14);

      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();
      return user;
    } catch (err) {
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
      throw err;
    }
  }

  static async doesUserExist(email) {
    const user = await User.findOne({ email: email });
    return user ? true : false;
  }

  static async checkCredentials(email, password) {
    try {
      const user = await User.findOne({ email: email });

      if (user) {
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        return isCorrectPassword ? user : null;
      }
    } catch (err) {
      throw new Error("Wrong password or Email");
    }
  }
}

module.exports = UserService;
