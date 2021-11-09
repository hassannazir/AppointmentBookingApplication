const jwt = require("jsonwebtoken");
const config = require("config");
const auth = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    res.send({ status: false, message: "No token, authorization denied!" });
  try {
    const decoded = jwt.verify(token, config.get("jwtSecretKey"));
    req.user = decoded.user[0];
    next();
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = auth;
