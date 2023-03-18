// #region Imports

// Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Express App
const app = express();

// Routes
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
app.use("/api/light", lightRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for Requests...
    app.listen(process.env.PORT, () => {
      console.log(
        `Database Connection Established & Listening on Port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
