const jwt = require("jsonwebtoken");
const mqtt = require("mqtt");
const raspi = require("raspi");
const gpio = require("raspi-gpio");

/**
 * Start MQTT Client Monitor
 */
const monitor = function () {
  raspi.init(() => {
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

      client.subscribe("safehouse/light");

      client.on("message", (topic, message) => {
        switch (topic) {
          case "safehouse/light":
            const output = new gpio.DigitalOutput(process.env.LIGHT_PIN);
            const state = parseInt(message);

            if (state === 1) {
              output.write(gpio.HIGH);
            } else if (state === 0) {
              output.write(gpio.LOW);
            } else {
              const input = new gpio.DigitalInput(process.env.LIGHT_PIN);
              client.publish("safehouse/light", input.read().toString());
            }

            break;
          default:
            break;
        }
      });
    });

    setInterval(() => {
      // console.log("Test");
    }, 1000);
  });
};

// Exports
module.exports = monitor;
