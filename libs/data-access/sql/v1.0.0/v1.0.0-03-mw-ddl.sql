\c $db;
set schema '$schema';

-- Create the Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

-- Create the Moods table
CREATE TABLE Moods (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(id),
    emoji VARCHAR(10) NOT NULL,
    note TEXT,
    timestamp TIMESTAMP NOT NULL
);

