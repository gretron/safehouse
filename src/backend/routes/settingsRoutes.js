// Modules
const express = require("express");

// Controller Funtions
const { handlePutSettings } = require("../controllers/settingsController");

// Middleware
const requireAuth = require("../middleware/requireAuth");

// Router
const router = express.Router();

// Require Authentication for Settings Routes
router.use(requireAuth);

router.put("/settings", handlePutSettings);

// Exports
module.exports = router;
