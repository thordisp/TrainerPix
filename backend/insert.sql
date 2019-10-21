INSERT INTO program
(userId, setNumber, repsNumber, workoutDescription)
VALUES
(1, 3, 12, 'This is one hell of a description');

INSERT INTO program
(userId, setNumber, repsNumber, workoutDescription)
VALUES
(2, 3, 12, 'Testing database function');

INSERT INTO users
(username, password, name, email, admin)
VALUES
('trainer', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', 'Jón', 'jon@example.org', true);

INSERT INTO users
(username, password, name, email, admin)
VALUES
('client', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', 'Sigga', 'sigga@example.org', false);