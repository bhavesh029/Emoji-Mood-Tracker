\c postgres;
set schema 'emoji_tracker_app';

-- Create the Users table
CREATE TABLE users (
    id VARCHAR(25) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Create the Moods table
CREATE TABLE moods (
    id SERIAL PRIMARY KEY,
    userId VARCHAR REFERENCES Users(id),
    emoji VARCHAR(10) NOT NULL,
    note TEXT,
    timestamp TIMESTAMP NOT NULL,
    updated_timestamp TIMESTAMP NOT NULL
);

