// #region Imports

// Modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

// Express App
const app = express();

// Routes
const userRoutes = require("./routes/userRoutes");
const lightRoutes = require("./routes/lightRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// Monitor
const { monitor } = require("./scripts/monitor");

// #endregion

// Middleware
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    // console.error(err);
  }

  next();
});
app.use((req, res, next) => {
  // Print Request Path and Method
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/light", lightRoutes);
app.use("/api/settings", settingsRoutes);

// Listen for Requests
global.db = new sqlite3.Database(
  "./db/safehouse.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (!err) {
      app.listen(process.env.PORT, () => {
        console.log(`Listening on Port ${process.env.PORT}...`);

        // Create User Table
        const createTableQuery =
          "CREATE TABLE IF NOT EXISTS user (user_id INTEGER PRIMARY KEY, rfid_tag TEXT, user_email TEXT, user_password TEXT, temperature_threshold INTEGER, humidity_threshold INTEGER, light_intensity_threshold INTEGER)";
        global.db.run(createTableQuery, [], function (err) {
          if (err) console.error(err.message);

          // Create Default Admin User
          const createAdminQuery =
            "INSERT OR IGNORE INTO User (user_id, rfid_tag, user_email, user_password, temperature_threshold, humidity_threshold, light_intensity_threshold) VALUES (?, ?, ?, ?, ?, ?, ?)";
          global.db.run(
            createAdminQuery,
            [1, "00 00 00", "admin", "password", 25, 50, 400],
            function (err) {
              if (err) console.error(err.message);
            }
          );
        });
      });

      // Start Monitor
      monitor();
    } else {
      console.error(err.message);
    }
  }
);
