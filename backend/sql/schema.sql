CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256),
  username VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL UNIQUE,
  email VARCHAR(256) NOT NULL UNIQUE,
  admin BOOLEAN DEFAULT FALSE,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256),
  email VARCHAR(256) NOT NULL,
  pin int UNIQUE,
  userId int,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  UNIQUE (email, userId),
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABlE program (
  id serial PRIMARY KEY,
  userId int,
  clientId int,
  name VARCHAR(256),
  link VARCHAR,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (clientId) REFERENCES clients (id)
);

CREATE TABLE exercise (
  id serial PRIMARY KEY,
  programId int,
  setNumber int,
  repsNumber int,
  workoutDescription TEXT NOT NULL,
  image1 VARCHAR DEFAULT NULL,
  image2 VARCHAR DEFAULT NULL,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp,
  FOREIGN KEY (programId) REFERENCES program (id)
);
