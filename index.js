let express = require("express");
let mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

// Initialize the app
let app = express();

// Enable all cors request
app.use(cors());

// Import routes
// let apiRoutes = require("./routes/index");

// Parse JSON bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Connect to Mongoose and set connection variable
const dbURI = process.env.DB_CONNECTION;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

//Setup server port
var port = process.env.PORT || 8080;

// Use Api routes in the App
// app.use("/", apiRoutes);

// Launch app to listen to port
app.listen(port, () => {
  console.log("Running on port" + port);
});
