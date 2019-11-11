const {
  validateUser,
  updateUser,
  findById,
} = require('../authentication/users');

const { query, pagedQuery } = require('../utils/db');
const { isBoolean } = require('../utils/validation');
const addPageMetadata = require('../utils/addPageMetadata');

async function listUsers(req, res) {
  const { offset = 0, limit = 10 } = req.query;

  const users = await pagedQuery(
    `SELECT
      id, username, email, admin, created, updated
    FROM
      users
    ORDER BY updated DESC`,
    [],
    { offset, limit },
  );

  const usersWithPage = addPageMetadata(
    users,
    req.path,
    { offset, limit, length: users.items.length },
  );

  return res.json(usersWithPage);
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

module.exports = {
  listUsers,
  listUser,
  updateUser: updateUserRoute,
  currentUser: currentUserRoute,
  updateCurrentUser,
};
