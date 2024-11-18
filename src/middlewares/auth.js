const { verifyToken } = require("../utils/jwt");

// authenticate is a simple middleware to make sure that
// users accessing this route are authenticated
const authenticate = () => {
  return (req, res, next) => {
    // to get the token
    // Bearer {TOKEN_IS_HERE}
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    try {
      // verifyToken verifies the token
      // and returns the user id
      req.userId = verifyToken(token);
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not Authorized", error: err });
    }
  };
};

module.exports = authenticate;
