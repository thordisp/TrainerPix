const express = require('express');
const catchErrors = require('../utils/catchErrors');
const { requireAuth, checkUserIsAdmin } = require('../authentication/auth');

const requireAdmin = [
  requireAuth,
  checkUserIsAdmin,
];

const {
  listClients,
  listUser,
  updateUser,
  currentUser,
  updateCurrentUser,
} = require('./users');

const {
  addProgram,
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
      newPin: '/program/{id}/add',
    },
    program: {
      newProgram: '/program',
      program: '/program/{id}',
    },
    exercise: {
      exercise: '/program/{id}/add',
    }
  });
}

router.get('/', indexRoute);

router.get('/users', catchErrors(listClients));
router.get('/users/me', requireAuth, catchErrors(currentUser));
router.patch('/users/me', requireAuth, catchErrors(updateCurrentUser));
router.get('/users/:id', requireAdmin, catchErrors(listUser));
router.patch('/users/:id', requireAdmin, catchErrors(updateUser));

// TODO: Bæta við require Auth
router.get('/program/:id', catchErrors(listProgram));
router.post('/program', catchErrors(addProgram));
router.post('/program/:programId/add/', catchErrors(addExercise));
router.patch('/program/:programId/add/:userId', catchErrors(newPin));
router.delete('/program/:id', catchErrors(deleteProgram));

module.exports = router;
