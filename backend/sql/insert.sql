INSERT INTO users
(id, name, username, email, password, admin)
VALUES
(1, 'Jón', 'trainer', 'jon@example.org', '$2b$10$85bqEyXkxGgCO1XYh1zYPOI6sCYELvvyj3WHCBJT1g0JZrA1fNTla', false);

INSERT INTO clients
(id, name, email)
VALUES
(20, 'Sigga', 'sigga@example.org');

INSERT INTO clients
(id, name, email)
VALUES
(21, 'Tester', 'tester@testing.com');

INSERT INTO program
(id, userId, clientId)
VALUES
(1, 1, 20);

INSERT INTO program
(id, userId, clientId)
VALUES
(2, 1, 21);

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(1, 3, 12, 'Exercise 1. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(1, 3, 12, 'Exercise 2. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(1, 3, 12, 'Exercise 3. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)

VALUES
(1, 3, 12, 'Exercise 4. This is one hell of a description');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(2, 3, 12, 'Exercise 1. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(2, 3, 12, 'Exercise 2. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(2, 3, 12, 'Exercise 3. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(2, 3, 12, 'Exercise 4. Testing database function');

INSERT INTO exercise
(programId, setNumber, repsNumber, workoutDescription)
VALUES
(2, 3, 12, 'Exercise 5. Testing database function');