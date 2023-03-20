const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * Create Authentication Token Using User Id
 * @param {User Id} _id
 * @returns Authentication Token
 */
const createToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.SECRET, { expiresIn: "3d" });
};

/**
 * Respond to User Register Request
 * @param {Request} req
 * @param {Response} res
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);
    console.log(user);

    const token = createToken(user.user_id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/**
 * Respond to User Login Request
 * @param {Request} req
 * @param {Response} res
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user.user_id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/**
 * Verify Token Validity and User Existence
 * @param {Request} req
 * @param {Response} res
 */
const verifyToken = async (req, res) => {
  console.log(req.headers);
  // Verify Authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "Authorization Token Required" });
  }

  // Get Token from Authorization Header
  const token = authorization.split(" ")[1];

  try {
    const { user_id } = jwt.verify(token, process.env.SECRET);

    const user = await User.exists(user_id);
    console.log(jwt.verify(token, process.env.SECRET));

    if (user) {
      res.status(200).json({ Ok: true, Error: "" });
    } else {
      res.status(401).json({ Ok: false, Error: "Request Is Not Authorized" });
    }
  } catch (err) {
    console.error(err);

    res.status(401).json({ Ok: false, Error: "Request Is Not Authorized" });
  }
};

/**
 * Verify Token Validity and User Existence
 * @param {Request} req
 * @param {Response} res
 */
const verifyAcl = async (req, res) => {
  res.status(200).json({ Ok: true, Error: "" });
};

module.exports = {
  loginUser,
  registerUser,
  verifyToken,
  verifyAcl,
};
