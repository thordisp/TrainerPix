const {
  validateUser,
  updateUser,
  findById,
} = require('../authentication/users');

const { query } = require('../utils/db');
const { isBoolean } = require('../utils/validation');

// Returns all clients.
async function listClients(req, res) {

  const q = `
    SELECT
      *
    FROM
      clients`;

  const clients = await query(q);

  if(!clients) {
    return res.status(404).json({ error: 'No clients found' });
  }

  return res.json(clients.rows);
}

async function listUser(req, res) {
  const { id } = req.params;

  const user = await findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
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

async function updateUserPin(pin, userId) {
  const q = `
    UPDATE
      clients
    SET
      pin = $1
    WHERE
      id = $2
    RETURNING
      pin`;

  return query(q, [ pin, userId ]);
}

// Uppfærir pin hjá notanda.
async function newPin(req, res) {
  const { pin } = req.body;
  const { userId } = req.params;

  const q = await updateUserPin( pin, userId );

  return res.status(201).json(q.rows[0]);
}



module.exports = {
  listClients,
  listUser,
  updateUser: updateUserRoute,
  currentUser: currentUserRoute,
  updateCurrentUser,
  newPin,
};
