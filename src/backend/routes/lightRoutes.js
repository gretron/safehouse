// #region Imports

// Modules
const express = require("express");

// Controller Functions
const {
  getLightState,
  setLightOn,
  setLightOff,
} = require("../controllers/lightController");

// #endregion

// Router
const router = express.Router();

// Get Light State
router.get("/state", getLightState);

// Turn On Light
router.get("/on", setLightOn);

// Turn Off Light
router.get("/off", setLightOff);

module.exports = router;
