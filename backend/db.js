const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

async function query(q, values = []) {
  const client = new Client({ connectionString });

  await client.connect();

  try {
    const result = await client.query(q, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
}

async function insert(data) {
  const q = `
INSERT INTO program
(userId, setNumber, repsNumber, workoutDescription, image)
VALUES
($1, $2, $3, $4, $5)`;
  const values = [data.userId, data.setNumber, data.repsNumber, data.workoutDescription, data.image];

  return query(q, values);
}

async function select() {
  const result = await query('SELECT * FROM program ORDER BY id');

  return result.rows;
}

async function update(id) {
  const q = `
UPDATE program
SET updated = current_timestamp
WHERE id = $1`;

  return query(q, id);
}

async function deleteRow(id) {
  const q = 'DELETE FROM program WHERE id = $1';

  return query(q, id);
}

module.exports = {
  query,
  insert,
  select,
  update,
  deleteRow, // delete er frátekið orð
};
