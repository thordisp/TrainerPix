CREATE TABLE program (
  id serial primary key,
  userId int,
  setNumber int,
  repsNumber int,
  workoutDescription TEXT NOT NULL,
  image VARCHAR(256) DEFAULT NULL,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);

CREATE TABLE users (
  id serial primary key,
  username character varying(255) UNIQUE NOT NULL,
  password character varying(255) NOT NULL,
  name varchar(128) not null,
  email varchar(256) not null,
  admin boolean default false,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);
