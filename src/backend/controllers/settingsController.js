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
    const settings = await Settings.update(
      user_id,
      temperature,
      humidity,
      light_intensity
    );

    res.status(200).json(settings);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  handlePutSettings,
};
