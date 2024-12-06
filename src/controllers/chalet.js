const ChaletService = require("../services/chalet");

class ChaletController {
  static async getChalets(req, res) {
    try {
      const { availability, tags, category } = req.query;

      let filters = {};

      // Add availability filter if provided
      if (availability !== undefined) {
        filters.availability = availability === "true";
      }

      // Add tags filter if provided
      if (tags) {
        const tagArray = tags.split(","); // Convert comma-separated tags into an array
        filters.tags = tagArray; // Store the array for further processing
      }

      if (category) {
        filters.category = category;
      }

      // Pass filters to the service
      const chalets = await ChaletService.getChalets(filters);

      res.status(200).json(chalets);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }

  // TODO: might remove this as well
  static async getAvailableChalets(req, res) {
    try {
      const queryParam = req.query.availability;
      const isAvailable = req.query.availability === "true" || false;
      const chalets = await ChaletService.getAvailabeChalets(isAvailable);
      res.status(200).json(chalets);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getChaletById(req, res) {
    try {
      const { id } = req.params;
      const chalet = await ChaletService.getChaletById(id);
      res.status(200).json(chalet);
    } catch (err) {
      res
        .status(404)
        .json({ message: "Chalet can not be found!", error: err.message });
    }
  }

  static async getChaletsBySearch(req, res) {
    try {
      const { search } = req.params;
      const chalets = await ChaletService.getChaletsBySearch(search);
      res.status(200).json(chalets);
    } catch (err) {
      res
        .status(404)
        .json({ message: "Chalets can not be found!", error: err.message });
    }
  }

  static async createChalet(req, res) {
    try {
      // extracting the chalet data
      const chaletData = req.body;

      // get all the photo paths of the uploaded chalets photos
      const chaletPhotos = req.files;
      const chaletPhotoPaths = chaletPhotos.map((file) => file.path);

      // add these paths to the chalet data object
      chaletData.chaletPhotoPaths = chaletPhotoPaths;

      const chalet = await ChaletService.postChalet(chaletData);
      res.status(201).json({
        message: "Chalet was created successfully!", // TODO: do i need to return the chalet in the response ?
      });
    } catch (err) {
      console.error(`Error creating chalet: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateChalet(req, res) {
    try {
      const chaletId = req.params.id;
      const updatedChalet = req.body;
      const chalet = await ChaletService.updateChalet(chaletId, updatedChalet);
      res.status(200).json({
        message: `Successfully updated chalet of id ${chalet._id}`,
      });
    } catch (err) {
      console.error(`Error updating chalet ${chalet._id}: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteChalet(req, res) {
    try {
      const chaletId = req.params.id;
      const chalet = await ChaletService.deleteChalet(chaletId);
      res.status(200).json({
        message: `Successfully deleted chalet of id ${chalet._id} and name ${chalet.name}`,
      });
    } catch (err) {
      console.error(`Error deleting chalet: ${err}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async filterWithTags(req, res) {
    try {
      const tags = req.body.tags;
      const chalets = await ChaletService.searchWithFilters(tags);
      res.status(200).json(chalets);
    } catch (err) {
      res.status(500).json({ error: "Inernal Server Error" });
    }
  }
}

module.exports = ChaletController;
