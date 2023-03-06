// #region Imports

// Modules
require("dotenv").config();
const express = require("express");

// Express App
const app = express();
const http = require("http");
const server = http.createServer(app);

// Socket Server
const { Server } = require("socket.io");
const io = new Server(server);

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

// Socket Server Events
io.on("connection", (socket) => {
  console.log("User has Connected...");
});

// Listen for Requests
server.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}...`);
});
