const express = require('express')
const movies = express.Router()

const moviesArray = require('../models/movies.json')
movies.get('/', (req, res) => {
    res.json(moviesArray)
})

module.exports = movies