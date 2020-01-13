DROP DATABASE IF EXISTS top_songsDB;
CREATE DATABASE top_songsDB;
USE top_songsDB;

CREATE TABLE top5000 (
    position INT NOT NULL,
    artist_name VARCHAR (100),
    song_name VARCHAR (100),
    year INT,
    raw_popularity DECIMAL(6,4),
    usa_popularity DECIMAL(6,4),
    uk_popularity DECIMAL(6,4),
    europe_popularity DECIMAL(6,4),
    world_popularity DECIMAL(6,4),
    PRIMARY KEY (position)

);