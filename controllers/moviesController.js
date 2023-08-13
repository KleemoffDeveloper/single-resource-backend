const express = require("express");
const moviesController = express.Router();

const {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../queries/moviesQuery");

// GET ALL MOVIES
moviesController.get("/", async (req, res) => {
  const allMovies = await getAllMovies();
  if (allMovies[0]) {
    res.status(200).json(allMovies);
  } else {
    res.status(500).json({ error: "Something went wrong..." });
  }
});

// GET ONE MOVIE
moviesController.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await getMovie(id);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ error: "Movie not found." });
  }
});

// CREATE MOVIE
moviesController.post("/", async (req, res) => {
  try {
    const movie = await createMovie(req.body);
    res.json(movie);
  } catch (_error) {
    res.status(400).json({ error: _error });
  }
});

// DELETE MOVIE
moviesController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedMovie = await deleteMovie(id);

  if (deletedMovie) {
    res.status(200).json(deletedMovie);
  } else {
    res.status(404).json("Movie not found.");
  }
});

// UPDATE MOVIE
moviesController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedMovie = await updateMovie(id, req.body);
  res.status(200).json(updatedMovie);
});

module.exports = moviesController;