const express = require('express');
const catchErrors = require('../utils/catchErrors');
const { requireAuth, checkUserIsAdmin } = require('../authentication/auth');

const requireAdmin = [
  requireAuth,
  checkUserIsAdmin,
];

const {
  createClient,
  listClient,
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
  listExercises,
  deleteProgram,
  clientProgram,
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
      program: '/program/{id}/view',
      exercises: '/program/{clientId}/view/{programId}',
    },
    exercise: {
      exercise: '/program/{id}/add',
    }
  });
}

router.get('/', indexRoute);

router.get('/users/:userId', catchErrors(listClients));
router.get('/users/me', requireAuth, catchErrors(currentUser));
router.patch('/users/me', requireAuth, catchErrors(updateCurrentUser));
router.get('/users/:id', requireAdmin, catchErrors(listUser));
router.patch('/users/:id', requireAdmin, catchErrors(updateUser));

// TODO: Bæta við require Auth
router.post('/program', requireAuth, catchErrors(addProgram));
router.post('/program/:programId/add/', requireAuth, catchErrors(addExercise));
router.delete('/program/:id', catchErrors(deleteProgram));

router.post('/client/programs', catchErrors(clientProgram));
router.get('/client/programs/:clientId', catchErrors(listProgram));
router.get('/client/programs/:clientId/:programId', catchErrors(listExercises));

router.get('/success/:clientId', requireAuth, catchErrors(listClient));
router.post('/newClient', requireAuth, catchErrors(createClient));

module.exports = router;
