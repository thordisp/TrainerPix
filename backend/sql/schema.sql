CREATE TABLE program (
  id serial primary key,
  userId int,
  setNumber int,
  repsNumber int,
  workoutDescription TEXT NOT NULL,
  image1 VARCHAR DEFAULT NULL,
  image2 VARCHAR DEFAULT NULL,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(256) NOT NULL UNIQUE,
  email VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  admin BOOLEAN DEFAULT false,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);
