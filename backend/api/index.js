const express = require('express');
const catchErrors = require('../utils/catchErrors');
const { requireAuth, checkUserIsAdmin } = require('../authentication/auth');

const requireAdmin = [
  requireAuth,
  checkUserIsAdmin,
];

const {
  listUsers,
  listUser,
  updateUser,
  currentUser,
  updateCurrentUser,
} = require('./users');

const {
  listProgram,
  addExercise,
  deleteProgram,
} = require('./program');

const router = express.Router();

/**
 * Route to show all the available API endpoints.
 */
function indexRoute(req, res) {
  return res.json({
    users: {
      users: '/users',
      user: '/users/{id}',
      register: '/users/register',
      login: '/users/login',
      me: '/users/me',
    },
    program: {
      program: '/program/{id}',
      exercise: '/program/',
    },
  });
}

router.get('/', indexRoute);

router.get('/users', catchErrors(listUsers));
router.get('/users/me', requireAuth, catchErrors(currentUser));
router.patch('/users/me', requireAuth, catchErrors(updateCurrentUser));
router.get('/users/:id', requireAdmin, catchErrors(listUser));
router.patch('/users/:id', requireAdmin, catchErrors(updateUser));

// TODO: Bæta við require Auth
router.get('/program/:id', catchErrors(listProgram));
router.post('/program/', catchErrors(addExercise));
router.delete('/program/:id', catchErrors(deleteProgram));

module.exports = router;
