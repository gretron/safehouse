// Modules
const express = require("express");

// Controller Functions
const { setLightOn, setLightOff } = require("../controllers/lightController");

// Router
const router = express.Router();

// Turn On Light
router.get("/on", setLightOn);

// Turn Off Light
router.get("/off", setLightOff);

// Exports
module.exports = router;
