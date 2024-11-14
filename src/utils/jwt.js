const jwt = require("jsonwebtoken");

// function to generate the JWT (JSON Web Token) for each user
// will be used upon user login
module.exports.generateToken = (user) => {
  try {
    const payload = {
      userId: user._id,
      userType: user.userType,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "2h",
    });

    return token;
  } catch (err) {
    throw err;
  }
};

// function to verify that user has a token, and then it
// returns the user ID
module.exports.verifyToken = (token) => {
  const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
  return userId;
};
