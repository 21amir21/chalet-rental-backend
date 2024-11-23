const Chalet = require("../models/Chalet");

class ChaletService {
  static async getChalets(filters) {
    try {
      const { availability, tags } = filters;

      // Base query
      let query = {};

      // Add availability filter
      if (availability !== undefined) {
        query.availability = availability;
      }

      // Add tags filter (match if at least one tag matches)
      if (tags && tags.length > 0) {
        query.tags = { $in: tags }; // MongoDB `$in` operator matches any value in the array
      }

      // Fetch data from the database based on the query
      const chalets = await Chalet.find(query); // Assuming a Mongoose model
      return chalets;
    } catch (err) {
      throw err;
    }
  }

  static async postChalet(chaletData) {
    try {
      const chalet = new Chalet(chaletData);
      await chalet.save();
      return chalet;
    } catch (err) {
      throw err;
    }
  }

  static async updateChalet(chaletId, updatedChaletData) {
    try {
      const chalet = await Chalet.findByIdAndUpdate(
        chaletId,
        updatedChaletData
      );
      if (!chalet) {
        throw new Error("Chalet not found");
      }
      return chalet;
    } catch (err) {
      throw err;
    }
  }

  static async deleteChalet(chaletId) {
    try {
      const chalet = await Chalet.findByIdAndDelete(chaletId);
      if (!chalet) {
        throw new Error("Chalet not found");
      }
      return chalet;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ChaletService;
