const db = require("../database/dbConfig.js");

const getAllMovies = async () => {
  console.log("Running get all movies...")
  try {
    const allMovies = await db.any("SELECT * FROM movies");
    return allMovies;
  }
   catch(error) {
    return error;
   }
};

const getMovie = async (id) => {
  try {
    const oneMovie = await db.one("SELECT * FROM movies WHERE id=$1", id);
    return oneMovie;
  } catch (err) {
    return err;
  }
};

const getMovieByTitle = async (title) => {
  try {
    const oneMovie = await db.one("SELECT * FROM movies WHERE lower(title) LIKE $1", title);
    return oneMovie;
  } catch (err) {
    return err;
  }
};

const newMovie = async (movie) => {
  try {
    const _newMovie = await db.one(
      "INSERT INTO movies (title, image_url, release_date, box_office, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [movie.title, movie.image_url, movie.release_date, movie.box_office, movie.rating]
    );
    return _newMovie;
  } catch (err) {
    return err;
  }
};

const updateMovie = async (id, movie) => {
  try {
    const updatedMovie = await db.one(
      "UPDATE movies SET title=$1, image_url=$2, release_date=$3, box_office=$4, rating=$5 WHERE id=$6 RETURNING *",
      [movie.title, movie.image_url, movie.release_date, movie.box_office, movie.rating, id]
    );
    return updatedMovie;
  } catch (err) {
    return err;
  }
};

const deleteMovie = async (id) => {
  try {
    const deletedMovie = await db.one(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      id
    );
    return deletedMovie;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getMovieByTitle,
  newMovie
};