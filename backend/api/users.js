const xss = require('xss');

const {
  validateUser,
  updateUser,
  findById,
} = require('../authentication/users');

const { validateClient } = require('../authentication/users');

const { query } = require('../utils/db');
const { isBoolean } = require('../utils/validation');

async function newClient(name, email, userId) {

  // Create a random number for link.
  const generatePin = Math.floor(1000 + (9999 - 1000) * Math.random());

  const q = `
    INSERT INTO
      clients (name, email, pin, userId)
    VALUES
      ($1, $2, ${generatePin}, $3)
    RETURNING *`;

  const values = [xss(name), xss(email), xss(userId)];
  const result = await query(
    q,
    values,
  );

  return result.rows[0];
}

async function createClient(req, res) {
  const { name, email } = req.body;

  const user = req.user;

  if (!user) {
    return res.status(400).json({ errors: 'Trainer must be logged in to register a new client.'});
  }

  const validationMessage =
    await validateClient({ name, email, user });

  if (validationMessage.length > 0) {
    return res.status(400).json({ errors: validationMessage });
  }

  const client = await newClient(name, email, user.id);

  if (!client) {
    return res.status(400).json({ errors: 'Could not register new client.' });
  }

  return res.status(201).json(client);
}

// Get client by id.
async function listClient(req, res, next) {
  const { clientId } = req.params;

  const client = await getClient( clientId );

  if (!client) {
    return res.status(404).json({ error: 'No client found.' });
  }

  return res.json(client.rows);
}

async function listUser(req, res) {
  const { id } = req.params;

  const user = await findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
}

// DB: Find clients by userId.
async function getClientsById(userId) {
  const q = `
  SELECT
    *
  FROM
    clients
  WHERE
    userId = $1`;

  return query(q, [ userId ]);
}

// Returns all clients.
async function listClients(req, res) {

  const { userId } = req.params;

  const clients = await getClientsById( userId );

  if (!clients) {
    return res.status(404).json({ error: 'No clients found.' });
  }

  return res.json(clients.rows);
}

// DB: Find client by id.
async function getClient(clientId) {
  const q = `
  SELECT
    *
  FROM
    clients
  WHERE
    id = $1`;

  return query(q, [ clientId ]);
}

async function updateUserRoute(req, res) {
  const { id } = req.params;
  const { user: currentUser } = req;
  const { admin } = req.body;

  const user = await findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!isBoolean(admin)) {
    return res.status(400).json({
      errors: [{
        field: 'admin',
        error: 'Must be a boolean',
      }],
    });
  }

  if (!admin && (currentUser.id === Number(id))) {
    return res.status(400).json({
      error: 'Can not remove admin privileges from self',
    });
  }

  const q = `
    UPDATE
      users
    SET admin = $1, updated = current_timestamp
    WHERE id = $2
    RETURNING
      id, username, email, admin, created, updated`;
  const result = await query(q, [Boolean(admin), id]);

  return res.status(201).json(result.rows[0]);
}

async function currentUserRoute(req, res) {
  const { user: { id } = {} } = req;

  const user = await findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
}

async function updateCurrentUser(req, res) {
  const { id } = req.user;

  const user = await findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, email } = req.body;

  const validationMessage = await validateUser({ password, email }, true, id);

  if (validationMessage.length > 0) {
    return res.status(400).json({ errors: validationMessage });
  }

  const result = await updateUser(id, password, email);

  if (!result) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  return res.status(200).json(result);
}



module.exports = {
  createClient,
  listClient,
  listClients,
  listUser,
  updateUser: updateUserRoute,
  currentUser: currentUserRoute,
  updateCurrentUser,
};
