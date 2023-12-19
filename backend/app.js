const express = require("express");
const http_logger = require("./utils/http_logging_operation"); // logger for http request
const app = express();
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./utils/logging_operation");

require("dotenv").config();

app.use(cookieParser());
app.use(http_logger); //log the HTTP requst into the console with "dev" format
app.use(express.json()); // parse the JSON data (content-Type: application/json) in the request body and make it available in req.body
app.use(express.urlencoded({ extended: false })); // parse the form data (Content-Type: application/x-www-form-urlencoded) in the request body and make it available in req.body

// app.use(cors());

const mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Successfully connected to mongoDB");
  })
  .catch(() => {
    logger.error("failed to connect to mongoDB");
  });

const main = require("./routes/main_route");
const auth = require("./routes/auth_route");
const user = require("./routes/user_route");

// TODO after create the client side add the frontend as static to server and undo below comment
// app.use(express.static("dist"));

app.use("/api/", main);
app.use("/api/auth", auth);
app.use("/api/user", user);

module.exports = app;
