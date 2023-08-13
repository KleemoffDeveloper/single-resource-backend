// DEPENDENCIES
const cors = require("cors");
const express = require("express");
require('dotenv').config();

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to <a href='/movies'>Pikaflx</a>");
});

const moviesController = require("./controllers/moviesController.js");
app.use("/movies", moviesController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found.");
});

// EXPORT
module.exports = app;