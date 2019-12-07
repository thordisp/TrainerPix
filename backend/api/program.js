const { query } = require('../utils/db');

const { isInt} = require('../utils/validation');

// DB: Býr til nýtt prógram.
async function insertProgram(userId, clientId, name, link) {
  const q = `
  INSERT INTO program
    (userId, clientId, name, link)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *`;

  return query(q, [ userId, clientId, name, link ]);
}

// Býr til nýtt prógramm.
async function addProgram(req, res) {
  const { userId, clientId, name, link } = req.body;

  const q = await insertProgram( userId, clientId, name, link );

  return res.status(201).json(q.rows[0]);
}

// DB: Saekir program fyrir client eftir clientId.
async function getProgram(clientId) {

  if (!isInt(clientId)) {
    return null;
  }

  const q = `
    SELECT
      *
    FROM
      program
    WHERE
      clientId = $1`;

  const program = await query(q, [clientId]);

  return program.rows;
}

// Birtir program fyrir client eftir clientId.
async function listProgram(req, res) {
  const { clientId } = req.params;

  const program = await getProgram(clientId);

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

async function getExercise(programId) {
  const q = `
  SELECT
    *
  FROM
    exercise
  WHERE
    programId = $1`;

  return query(q, [ programId ]);
}

async function listExercises(req, res, next) {
  const { programId } = req.params;

  const exercises = await getExercise( programId );

  if (!exercises) {
    return res.status(404).json({ error: 'No exercises found.' });
  }

  return res.json(exercises.rows);
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

// DB: Finnur client sem á pin númer.
async function findClient(pin) {
  const queryString = `
    SELECT
      *
    FROM
      clients
    WHERE
      pin = $1`;

  const result = await query(queryString, [ pin ]);
  if (result.rows) {
    return result.rows[0];
  }
  return undefined;
}

// Skilar client og öllum æfingarprógömmum sem client á.
async function clientProgram(req, res) {
  const { pin } = req.body;

  const client = await findClient(pin);

  if(!client) {
    return res.status(404).json({ error: 'Pin is incorrect!'});
  } else {
      const q = `
      SELECT
        *
      FROM
        program
      WHERE
        clientId = ${client.id}
      `;

      const program = await query(q);

      if(!program) {
        return res.status(404).json({ error: 'Client has no programs' });
      }

      return res.json({ client, programs: program.rows });
  }
}


module.exports = {
  addProgram,
  listProgram,
  addExercise,
  listExercises,
  deleteProgram,
  clientProgram,
};