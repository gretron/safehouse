// #region Imports

// Modules
require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Express App
const app = express();

// Routes
const userRoutes = require("./routes/userRoutes");
const lightRoutes = require("./routes/lightRoutes");

// #endregion

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  // Print Request Path and Method
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/light", lightRoutes);

// Listen for Requests
global.db = new sqlite3.Database(
  "./db/safehouse.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (!err) {
      app.listen(process.env.PORT, () => {
        console.log(`Listening on Port ${process.env.PORT}...`);
      });
    } else {
      console.error(err.message);
    }
  }
);

// Create User Table
const createTableQuery =
  "CREATE TABLE IF NOT EXISTS user (user_id INTEGER PRIMARY KEY, user_email TEXT, user_password TEXT)";
global.db.run(createTableQuery, [], function (err) {
  if (err) console.error(err.message);
});
