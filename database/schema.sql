DROP DATABASE IF EXISTS movies_dev;
CREATE DATABASE movies_dev;

\c movies_dev;

DROP TABLE IF EXISTS movies

CREATE TABLE movies (
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 image_url TEXT,
 release_date TEXT,
 box_office TEXT,
 rating FLOAT
 );  