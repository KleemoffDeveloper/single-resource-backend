const express = require("express");
const movies = express.Router();
const {
  getAllMovies,
  getMovie,
  deleteMovie,
  getMovieByTitle,
  updateMovie,
  newMovie,
} = require("../queries/moviesQuery.js");

// INDEX
movies.get("/", async (req, res) => {
  const allMovies = await getAllMovies();
  if (allMovies[0]) {
    res.status(200).json(allMovies);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
movies.get("/:title", async (req, res) => {
  const { title } = req.params;
  const movie = await getMovieByTitle(title.toLowerCase());
  if (movie.title) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

const validateMovie = (req, res, next) => {
  const { title } = req.body;
  if (
    title[title.length - 1] !== "?"
  ) {
    next();
  } else {
    res.status(400).json({ error: "Movie title may not end in a question mark." });
  }
};

// CREATE
movies.post("/", validateMovie, async (req, res) => {
  try {
    const movie = await newMovie(req.body);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// UPDATE
movies.put("/:id", validateMovie, async (req, res) => {
  const { id } = req.params;
  const updatedMovie = await updateMovie(id, req.body);
  res.status(200).json(updatedMovie);
});

// DELETE
movies.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedMovie = await deleteMovie(id);
  if (deletedMovie.id) {
    res.status(200).json(deletedMovie);
  } else {
    res.status(404).json("Bookmark not found");
  }
});

module.exports = movies;