// Modules
const express = require("express");

// Controller Funtions
const {
  loginUser,
  registerUser,
  verifyToken,
} = require("../controllers/userController");

// Router
const router = express.Router();

// POST Login User
router.post("/login", loginUser);

// POST Register User
router.post("/register", registerUser);

// POST JWT Verification
router.post("/jwt", verifyToken);

// Exports
module.exports = router;
