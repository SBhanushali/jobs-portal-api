let express = require("express");
let mongoose = require("mongoose");
var cors = require("cors");
const createServer = require("./server");
require("dotenv").config();

//Setup server port
var port = process.env.PORT || 8080;
// Connect to Mongoose and set connection variable
const dbURI = process.env.DB_CONNECTION;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = createServer(); // new
    app.listen(port, () => {
      console.log("Server has started!");
    });
  })
  .catch((err) => console.log(err));
