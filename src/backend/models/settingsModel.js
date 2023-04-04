const User = require("./userModel");

// Settings Module
let Settings = {};

/**
 * Create a New User in Database
 * @param {string} email Email of New User
 * @param {string} hash_password Hash Password of New User
 */
function updateSettings(user_id, temperature, humidity, light_intensity) {
  return new Promise((resolve, reject) => {
    // Get Database
    const db = global.db;

    // Create New User
    const updateSettingsQuery =
      "UPDATE user SET temperature_threshold = ?, humidity_threshold = ?, light_intensity_threshold = ? WHERE user_id = ?";
    db.run(
      updateSettingsQuery,
      [temperature, humidity, light_intensity, user_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      }
    );
  });
}

Settings.update = async (user_id, temperature, humidity, light_intensity) => {
  let user;

  try {
    user = await User.exists(user_id);
  } catch (err) {
    console.error(err);
    throw Error(err);
  }

  if (!user) {
    throw Error("User does not exist");
  }

  if (!Number.isInteger(temperature)) {
    throw Error("Temperature threshold is not an integer");
  }

  if (!Number.isInteger(light_intensity)) {
    throw Error("Light intensity threshold is not an integer");
  }

  const light_intensity_min = 0;
  const light_intensity_max = 1023;

  if (light_intensity > light_intensity_max) {
    light_intensity = light_intensity_max;
  } else if (light_intensity < light_intensity_min) {
    light_intensity = light_intensity_min;
  }

  const rowCount = await updateSettings(
    user_id,
    temperature,
    humidity,
    light_intensity
  );

  if (rowCount < 1) {
    throw Error("An error occurred while updating the settings");
  }

  user = await User.exists(user_id);

  return {
    temperature: user.temperature_threshold,
    humidity: user.humidity_threshold,
    light_intensity: user.light_intensity_threshold,
  };
};

// Exports
module.exports = Settings;
