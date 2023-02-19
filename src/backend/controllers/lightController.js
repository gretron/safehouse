const { spawn } = require("child_process");

/**
 * Turn On Light
 */
const setLightOn = async (req, res) => {
  let sendData;

  // Execute Python Script
  const python = spawn("python", [__dirname + "/../scripts/light.py", "on"]);

  // Collect Data from Python Process
  python.stdout.on("data", (data) => {
    console.log("Data Received from Python Script...");
    sendData = data.toString();
  });

  // Collect Data from Python Process
  python.stderr.on("data", (data) => {
    console.log("Error Received from Python Script...");
    sendData = data.toString();
  });

  // On Python Process Close
  python.on("close", (code) => {
    console.log(`Python Process Closed with Code ${code}`);

    // Send Data to Browser
    res.status(200).json(sendData);
  });
};

/**
 * Turn On Light
 */
const setLightOff = async (req, res) => {
  let sendData;

  // Execute Python Script
  const python = spawn("python", [__dirname + "/../scripts/light.py", "off"]);

  // Collect Data from Python Process
  python.stdout.on("data", (data) => {
    console.log("Data Received from Python Script...");
    sendData = data.toString();
  });

  // On Python Process Close
  python.on("close", (code) => {
    console.log(`Python Process Closed with Code ${code}`);

    // Send Data to Browser
    res.status(200).json(sendData);
  });
};

module.exports = {
  setLightOn,
  setLightOff,
};
