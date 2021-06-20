const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");

// set the environment variables for development or test environment
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.development`),
  });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.test`),
  });
}

// setup an express instance
const app = express();

// handling logs
const morgan = require("morgan");

// handling cors request
app.use(
  cors({
    origin: "*",
  })
);

// parses incoming requests with JSON payloads
app.use(express.json());

// / Logs
app.use(morgan("combined"));

app.get("/", (req, res, next) => {
  return res.status(200).json({ success: true, data: "good" });
});
module.exports = app;
