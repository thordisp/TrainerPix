const { query, deleteRow, insert } = require('../utils/db');

const { isInt} = require('../utils/validation');


// Saekir program fyrir user eftir userId.
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

// Baetir vid aefingu i program.
// TODO: Tharf ad ath hvernig nad er i userId.
async function addExercise(req, res, next) {
  const { userId, setNumber, repsNumber, workoutDescription, image1, image2 } = req.body;

  const q = await insert( userId, setNumber, repsNumber, workoutDescription, image1, image2 );

  return res.status(201).json(q.rows[0]);
}

// Eydir aefingu ur programmi eftir id.
async function deleteExercise(req, res) {
  const { id } = req.params;

  await deleteRow(id);

  return res.status(204).json({});
}


module.exports = {
  listProgram,
  addExercise,
  deleteExercise,
};