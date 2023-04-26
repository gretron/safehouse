// Monitor
const { changeThresholds } = require("../scripts/monitor");

const Settings = require("../models/settingsModel");

/**
 * Handle Settings PUT Request
 * @param {Request} req
 * @param {Response} res
 */
const handlePutSettings = async (req, res) => {
  const { temperature, humidity, light_intensity } = req.body;
  const user_id = req.user.user_id;

  try {
    const user = await Settings.update(
      user_id,
      temperature,
      humidity,
      light_intensity
    );

    if (global.user.user_id == user.user_id) {
      changeThresholds(user);
    }

    const settings = {
      temperature: user.temperature_threshold,
      humidity: user.humidity_threshold,
      light_intensity: user.light_intensity_threshold,
    };

    res.status(200).json(settings);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/**
 * Handle Settings GET Request
 * @param {Request} req
 * @param {Response} res
 */
const handleGetSettings = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const settings = await Settings.select(user_id);

    res.status(200).json(settings);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  handleGetSettings,
  handlePutSettings,
};
