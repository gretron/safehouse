// Modules
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify Authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "Authorization Token Required" });
  }

  // Get Token from Authorization Header
  const token = authorization.split(" ")[1];

  try {
    const { user_id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.exists(user_id);

    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ msg: "Request Is Not Authorized" });
  }
};

module.exports = requireAuth;
