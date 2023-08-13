const db = require('../database/dbConfig')

const getAllMovies = async () => {
    try {
        const allMovies = await db.any('SELECT * FROM movies')
        return allMovies;
    }
    catch (error) {
        return error;
    }
}

const getMovie = async (id) => {
    try {
        const oneMovie = await db.one('SELECT * FROM movies WHERE id=$1', id)
        return oneMovie;
    }
    catch (error) {
        return error;
    }
}

const createMovie = async (movie) => {
    try {
        const newMovie = await db.one(
            "INSERT INTO movies ('title, image_url, release_date, box_office, rating') VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
                movie.title,
                movie.image_url,
                movie.release_date,
                movie.box_office,
                movie.rating,
            ]
        )
        return newMovie;
    }
    catch (error) {
        return error;
    }
}

const deleteMovie = async(id) => {
    try {
        const deletedMovie = await db.one("DELETE FROM movies WHERE id = $1 RETURNING *", id)
        return deletedMovie;
    }
    catch (error) {
        return error;
    }
}

const updateMovie = async (id, movie) => {
    try {
        const updatedMovie = await db.one(
            "UPDATE movies SET title=$2, image_url=$3, release_date=$4, box_office=$5, rating=$6 WHERE id = $1 RETURNING *",
            [
                id,
                movie.title,
                movie.image_url,
                movie.release_date,
                movie.box_office,
                movie.rating,
            ]
        )
        return updatedMovie;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    getAllMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
}