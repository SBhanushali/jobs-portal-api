const express = require("express");

var cors = require("cors");
require("dotenv").config();

function createServer() {
  // Initialize the app
  const app = express();
  // Enable all cors request
  app.use(cors()); // Import routes
  let apiRoutes = require("./routes/index");

  // Parse JSON bodies
  app.use(express.json());
  //Parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // Use Api routes in the App
  app.use("/", apiRoutes);
  return app;
}

module.exports = createServer;
