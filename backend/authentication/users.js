const bcrypt = require('bcrypt');
const xss = require('xss');

const {
  isInt,
  isEmpty,
  isNotEmptyString,
  isString,
  toPositiveNumberOrDefault,
  lengthValidationError,
} = require('../utils/validation');

const { query, conditionalUpdate } = require('../utils/db');

const {
  SALT_ROUNDS: saltRounds = 11,
} = process.env;

async function findByUsername(username) {
  const q = `
    SELECT
      id, username, password, email, admin
    FROM
      users
    WHERE username = $1`;

  const result = await query(q, [username]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function findClientByEmail(email, trainerId) {
  const q = `
    SELECT
      id, name, email, pin, userid
    FROM
      clients
    WHERE email = $1 AND userid = $2`;

  const result = await query(q, [email, trainerId]);

  if (result.rowCount > 0) {
    return result.rows[0];
  }

  return null;
}

async function findByEmail(email) {
  const q = `
    SELECT
      id, username, password, email, admin
    FROM
      users
    WHERE email = $1`;

  const result = await query(q, [email]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function validateUser(
  { username, password, email } = {},
  patching = false,
  id = null,
) {
  const validations = [];

  // can't patch username
  if (!patching) {
    if (!isNotEmptyString(username, { min: 3, max: 32 })) {
      validations.push({
        field: 'Notendanafn',
        error: 'vinsamlegast sláðu inn notendanafn.',
      });
    }

    const user = await findByUsername(username);

    if (user) {
      validations.push({
        field: 'Notendanafn',
        error: 'notendanafn er nú þegar til.',
      });
    }
  }

  if (!patching || password || isEmpty(password)) {
    if (!isNotEmptyString(password, { min: 8 })) {
      validations.push({
        field: 'Lykilorð',
        error: 'þarf að vera að minnsta kosti 8 stafir.',
      });
    }
  }

  if (!patching || email || isEmpty(email)) {
    if (!isNotEmptyString(email, { min: 1, max: 64 })) {
      validations.push({
        field: 'Netfang',
        error: 'vinsamlegast sláðu inn netfangið þitt.',
      });
    }

    const user = await findByEmail(email);

    if (user) {
      const current = user.id;

      if (patching && id && current === toPositiveNumberOrDefault(id, 0)) {
        // we can patch our own email
      } else {
        validations.push({
          field: 'email',
          error: 'Email exists',
        });
      }
    }
  }

  return validations;
}

async function validateClient(
  { name, email, user } = {},
  patching = false,
  id = null,
) {
  const validations = [];

  // can't patch username
  if (!patching) {
    if (!isNotEmptyString(name, { min: 3, max: 32 })) {
      validations.push({
        field: 'Nafn',
        error: 'er krafist.',
      });
    }
  }

  if (!patching || email || isEmpty(email)) {
    if (!isNotEmptyString(email, { min: 1, max: 64 })) {
      validations.push({
        field: 'Netfang',
        error: 'er krafist.',
      });
    }

    const client = await findClientByEmail(String(email), user.id);

    if (client) {
      validations.push({
        field: 'email',
        error: 'Trainer has already registrered this client.',
      });
    }
  }

  return validations;
}

async function comparePasswords(password, hash) {
  const result = await bcrypt.compare(password, hash);

  return result;
}

async function findById(id) {
  if (!isInt(id)) {
    return null;
  }

  const user = await query(
    `SELECT
      id, username, email, admin, created, updated
    FROM
      users
    WHERE id = $1`,
    [id],
  );

  if (user.rows.length !== 1) {
    return null;
  }

  return user.rows[0];
}

async function createUser(username, password, email, admin = false) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const q = `
    INSERT INTO
      users (username, email, password, admin)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *`;

  const values = [xss(username), xss(email), hashedPassword, admin];
  const result = await query(
    q,
    values,
  );

  return result.rows[0];
}

async function updateUser(id, password, email) {
  if (!isInt(id)) {
    return null;
  }

  const fields = [
    isString(password) ? 'password' : null,
    isString(email) ? 'email' : null,
  ];

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  const values = [
    hashedPassword,
    isString(email) ? xss(email) : null,
  ];

  fields.push('updated');
  values.push(new Date());

  const result = await conditionalUpdate('users', id, fields, values);

  if (!result) {
    return null;
  }

  const updatedUser = result.rows[0];
  delete updatedUser.password;

  return updatedUser;
}

module.exports = {
  validateUser,
  validateClient,
  comparePasswords,
  findByUsername,
  findById,
  createUser,
  updateUser,
};