const { query } = require('../utils/db');

const { isInt} = require('../utils/validation');

// DB: Býr til nýtt prógram.
async function insertProgram(userId, clientId, link) {
  const q = `
  INSERT INTO program
    (userId, clientId, link)
  VALUES
    ($1, $2, $3)
  RETURNING *`;

  return query(q, [ userId, clientId, link ]);
}

// Býr til nýtt prógram.
async function addProgram(req, res) {
  const { userId, clientId, link } = req.body;

  const q = await insertProgram( userId, clientId, link );

  return res.status(201).json(q.rows[0]);
}

// DB: Saekir program fyrir user eftir userId.
async function getProgram(id) {

  if (!isInt(id)) {
    return null;
  }

  const q = `
    SELECT
      *
    FROM
      program
    WHERE
      userId = $1`;

  const program = await query(q, [id]);

  return program.rows;
}

// Birtir program fyrir user eftir userId.
async function listProgram(req, res) {
  const { id } = req.params;

  const program = await getProgram(id);

  if (!program) {
    return res.status(404).json({ error: 'Program not found', program: program });
  }

  return res.json(program);
}

// DB: Býr til nýja æfingu og tengir við program.
async function insertExercise(programId, setNumber, repsNumber, workoutDescription, image1, image2) {
  const q = `
    INSERT INTO exercise
      (programId, setNumber, repsNumber, workoutDescription, image1, image2)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  return query(q, [ programId, setNumber, repsNumber, workoutDescription, image1, image2 ]);
}

// Baetir vid aefingu i program.
// TODO: Tharf ad ath hvernig nad er i programId.
async function addExercise(req, res, next) {
  const { programId, setNumber, repsNumber, workoutDescription, image1, image2 } = req.body;

  const q = await insertExercise( programId, setNumber, repsNumber, workoutDescription, image1, image2 );

  return res.status(201).json(q.rows[0]);
}

// DB: Eyðir prógrammi eftir id.
async function deleteRow(id) {
  const q = 'DELETE FROM program WHERE id = $1';

  return query(q, [id]);
}

// Eyðir prógrammi eftir id.
async function deleteProgram(req, res) {
  const { id } = req.params;

  await deleteRow(id);

  return res.status(204).json({});
}


module.exports = {
  addProgram,
  listProgram,
  addExercise,
  deleteProgram,
};