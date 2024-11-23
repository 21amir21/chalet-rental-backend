const { verifyToken } = require("../utils/jwt");
const Chalet = require("../models/Chalet");

// authenticate is a simple middleware to make sure that
// users accessing this route are authenticated
const authenticate = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    // to get the token
    // Bearer {TOKEN_IS_HERE}
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    try {
      // verifyToken verifies the token
      // and returns decoded payload of the JWT
      const decoded = verifyToken(token);

      req.userId = decoded.userId;
      req.userType = decoded.userType;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not Authorized", error: err });
    }
  };
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userType)) {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }
    next();
  };
};

const checkOwnership = () => {
  return async (req, res, next) => {
    try {
      const chaletId = req.params.id; // Extract chalet ID from the route parameter
      const chalet = await Chalet.findById(chaletId);

      if (!chalet) {
        return res.status(404).json({ error: "Chalet not found" });
      }

      if (chalet.owner.toString() !== req.userId) {
        return res
          .status(403)
          .json({ error: "Forbidden: You do not own this chalet" });
      }

      next(); // Ownership confirmed, proceed to the next middleware or route handler
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = { authenticate, authorize, checkOwnership };
