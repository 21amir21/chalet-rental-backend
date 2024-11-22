const { verifyToken } = require("../utils/jwt");

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

module.exports = { authenticate, authorize };
