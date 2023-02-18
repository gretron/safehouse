/**
 * Turn On Light
 */
const setLightOn = async (req, res) => {
  // TODO: Execute Python Light On Script

  res.status(200).send("Light Turned On");
};

/**
 * Turn On Light
 */
const setLightOff = async (req, res) => {
  // TODO: Execute Python Light On Script

  res.status(200).json("Light Turned Off");
};

module.exports = {
  setLightOn,
  setLightOff,
};
