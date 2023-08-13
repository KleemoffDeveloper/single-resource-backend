const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.json({instructions: "Go to /api for json."})
})

const moviesController = require('./controllers/moviesController')
app.use('/api', moviesController)

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send({ error: "Page not found" });
  });

module.exports = app