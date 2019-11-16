const { Client } = require('pg');

/**
 * Execute an SQL query.
 *
 * @param {string} sqlQuery - SQL query to execute
 * @param {array} [values=[]] - Values for parameterized query
 *
 * @returns {Promise} Promise representing the result of the SQL query
 */
async function query(sqlQuery, values = []) {
  const connectionString = process.env.DATABASE_URL;

  const client = new Client({ connectionString });
  await client.connect();

  let result;

  try {
    result = await client.query(sqlQuery, values);
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }

  return result;
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

module.exports = {
  query,
  select,
  update,
};
