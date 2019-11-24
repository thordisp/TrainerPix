INSERT INTO users
(id, name, username, email, password, admin)
VALUES
(1, 'Jón', 'trainer', 'jon@example.org', '$2b$10$85bqEyXkxGgCO1XYh1zYPOI6sCYELvvyj3WHCBJT1g0JZrA1fNTla', false);

INSERT INTO clients
(id, name, email, pin, userId)
VALUES
(20, 'Sigga', 'sigga@example.org', 3453, 1);

INSERT INTO clients
(id, name, email, pin, userId)
VALUES
(21, 'Tester', 'tester@testing.com', 2352, 1);

INSERT INTO program
(id, userId, clientId, name)
VALUES
(20, 1, 20, 'Testing Program 1');

INSERT INTO program
(id, userId, clientId, name)
VALUES
(21, 1, 21, 'Testing Program 2');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(20, 3, 12, 'Exercise 1. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(20, 3, 12, 'Exercise 2. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(20, 3, 12, 'Exercise 3. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)

VALUES
(20, 3, 12, 'Exercise 4. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(21, 3, 12, 'Exercise 1. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(21, 3, 12, 'Exercise 2. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(21, 3, 12, 'Exercise 3. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(21, 3, 12, 'Exercise 4. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(21, 3, 12, 'Exercise 5. Testing database function');