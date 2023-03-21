const jwt = require("jsonwebtoken");
const mqtt = require("mqtt");
const raspi = require("raspi");
const gpio = require("raspi-gpio");
const sensor = require("node-dht-sensor");

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
      client.subscribe("safehouse/switch");

      client.on("message", (topic, message) => {
        switch (topic) {
          case "safehouse/light":
            const output = new gpio.DigitalOutput(process.env.LIGHT_PIN);

            if (message.includes("1")) {
              output.write(gpio.HIGH);
            } else if (message.includes("0")) {
              output.write(gpio.LOW);
            }

            break;
          default:
            break;
        }
      });
    });

    setInterval(() => {
      sensor.read(11, 20, function(err, temperature, humidity) {
        if (!err) {
          console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
          client.publish("safehouse/temperature", temperature.toString());
          client.publish("safehouse/humidity", humidity.toString());
        }
      });
    }, 1000);
  });
};

// Exports
module.exports = monitor;
