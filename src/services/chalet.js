const Chalet = require("../models/Chalet");

class ChaletService {
  static async getChalets(filters) {
    try {
      const { availability, tags, category } = filters;

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

      // Add category filter
      if (category !== undefined) {
        query.category = category;
      }

      // Fetch data from the database based on the query
      const chalets = await Chalet.find(query).populate("creator"); // Assuming a Mongoose model
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

  static async getChaletById(id) {
    try {
      const chalet = await Chalet.findById(id).populate("creator");
      return chalet;
    } catch (err) {
      throw new Error(`Can't find Chalet with this id ${id}`);
    }
  }

  static async getChaletsBySearch(search) {
    try {
      let chalets = [];

      if (search === "all") {
        chalets = await Chalet.find().populate("creator");
      } else {
        chalets = await Chalet.find({
          $or: [
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        }).populate("creator");
      }

      return chalets;
    } catch (err) {
      throw new Error("Chalet can not be found with these searchs");
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
