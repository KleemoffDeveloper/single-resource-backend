const express = require('express')
const app = express()

// ROUTES
const index = require('./controllers/movies')
app.use('/', index)

// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

module.exports = app