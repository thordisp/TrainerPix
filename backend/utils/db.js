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

async function insert(userId, setNumber, repsNumber, workoutDescription, image1, image2) {
  const q = `
    INSERT INTO program
      (userId, setNumber, repsNumber, workoutDescription, image1, image2)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  return query(q, [ userId, setNumber, repsNumber, workoutDescription, image1, image2 ]);
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

async function conditionalUpdate(table, id, fields, values) {
  const filteredFields = fields.filter(i => typeof i === 'string');
  const filteredValues = values
    .filter(
      i => typeof i === 'string' ||
      typeof i === 'number' ||
      i instanceof Date,
    );

  if (filteredFields.length === 0) {
    return false;
  }

  if (filteredFields.length !== filteredValues.length) {
    throw new Error('fields and values must be of equal length');
  }

  // id is field = 1
  const updates = filteredFields.map((field, i) => `${field} = $${i + 2}`);

  const q = `
    UPDATE ${table}
      SET ${updates.join(', ')}
    WHERE
      id = $1
    RETURNING *
    `;

  const queryValues = [id].concat(filteredValues);

  debug('Conditional update', q, queryValues);

  const result = await query(q, queryValues);

  return result;
}

async function deleteRow(id) {
  const q = 'DELETE FROM program WHERE id = $1';

  return query(q, [id]);
}

async function pagedQuery(
  sqlQuery,
  values = [],
  { offset = 0, limit = 10 } = {},
) {
  console.assert(Array.isArray(values), 'values should be an array');

  const sqlLimit = values.length + 1;
  const sqlOffset = values.length + 2;
  const q = `${sqlQuery} LIMIT $${sqlLimit} OFFSET $${sqlOffset}`;

  const limitAsNumber = toPositiveNumberOrDefault(limit, 10);
  const offsetAsNumber = toPositiveNumberOrDefault(offset, 0);

  const combinedValues = values.concat([limitAsNumber, offsetAsNumber]);

  const result = await query(q, combinedValues);

  return {
    limit: limitAsNumber,
    offset: offsetAsNumber,
    items: result.rows,
  };
}

module.exports = {
  query,
  insert,
  select,
  update,
  conditionalUpdate,
  pagedQuery,
  deleteRow, // delete er frátekið orð
};
