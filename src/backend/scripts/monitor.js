const jwt = require("jsonwebtoken");
const mqtt = require("mqtt");

/**
 * Start MQTT Client Monitor
 */
const monitor = function () {
  // TODO: Monitor Function Connecting to MQTT Broker
  const adminToken = jwt.sign({ user_id: 1 }, process.env.SECRET);

  const options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: adminToken,
    password: "any",
  };

  const client = mqtt.connect(options);

  client.on("connect", () => {
    console.log("Connected to MQTT Broker");
  });
};

// Exports
module.exports = monitor;
