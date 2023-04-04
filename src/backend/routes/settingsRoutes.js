// Modules
const express = require("express");

// Controller Funtions
const {
  handlePutSettings,
  handleGetSettings,
} = require("../controllers/settingsController");

// Middleware
const requireAuth = require("../middleware/requireAuth");

// Router
const router = express.Router();

// Require Authentication for Settings Routes
router.use(requireAuth);

// GET Settings
router.get("/", handleGetSettings);

// PUT Settings
router.put("/", handlePutSettings);

// Exports
module.exports = router;
