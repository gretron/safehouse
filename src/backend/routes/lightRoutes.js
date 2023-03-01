// Modules
const express = require("express");

// Controller Functions
const { getLightState, setLightOn, setLightOff } = require("../controllers/lightController");

// Router
const router = express.Router();

router.get("/state", getLightState);

// Turn On Light
router.get("/on", setLightOn);

// Turn Off Light
router.get("/off", setLightOff);

// Exports
module.exports = router;
