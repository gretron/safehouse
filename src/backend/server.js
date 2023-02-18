// Modules
require("dotenv").config();
const express = require("express");

// Express App
const app = express();

// Routes
const lightRoutes = require("./routes/lightRoutes");

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/light", lightRoutes);

// Listen for Requests...
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
