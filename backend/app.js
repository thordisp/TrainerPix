// Tengir vid .env skra sem gefur slod ad gagnagrunni.
// require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');

// const { userStrategy, serializeUser, deserializeUser } = require('./users');
// const apply = require('./apply');
// const register = require('./register');
// const admin = require('./admin');
// const applications = require('./applications');

const {
  HOST: hostname = '127.0.0.1',
  PORT: port = 5000,
  //SESSION_SECRET: sessionSecret,
} = process.env;

// if (!sessionSecret) {
//   console.error('Add SESSION_SECRET to .env');
//   process.exit(1);
// }

const app = express();

// app.use(session({
//   secret: sessionSecret,
//   resave: false,
//   saveUninitialized: false,
//   maxAge: 30 * 24 * 60 * 1000, // 30 dagar
// }));

// app.use(express.urlencoded({ extended: true }));

// passport.use(new Strategy(userStrategy));

// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static('public'));

/**
 * Hjálparfall til að athuga hvort reitur sé gildur eða ekki.
 *
 * @param {string} field Middleware sem grípa á villur fyrir
 * @param {array} errors Fylki af villum frá express-validator pakkanum
 * @returns {boolean} `true` ef `field` er í `errors`, `false` annars
 */
// function isInvalid(field, errors) {
//   return Boolean(errors.find(i => i.param === field));
// }

// app.locals.isInvalid = isInvalid;

// app.use((req, res, next) => {
//   // Látum `users` alltaf vera til fyrir view
//   res.locals.user = req.isAuthenticated() ? req.user : null;

//   next();
// });

// app.get('/login', (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }

//   let message = '';

//   if (req.session.messages && req.session.messages.length > 0) {
//     message = req.session.messages.join(', ');
//     req.session.messages = [];
//   }

//   return res.render('login', { page: 'login', title: 'Innskráning', message });
// });

// app.post(
//   '/login',

//   passport.authenticate('local', {
//     failureMessage: 'Notandi eða lykilorð vitlaust.',
//     failureRedirect: '/login',
//   }),

//   (req, res) => {
//     res.redirect('/applications');
//   },
// );

// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// app.use('/', apply);
// app.use('/register', register);
// app.use('/applications', applications);
// app.use('/admin', admin);

app.get('/', function (req, res) {
  res.send('Hello World')
})

function notFoundHandler(req, res, next) { // eslint-disable-line
  res.status(404).render('error', { page: 'error', title: '404', error: '404 fannst ekki' });
}

function errorHandler(error, req, res, next) { // eslint-disable-line
  console.error(error);
  res.status(500).render('error', { page: 'error', title: 'Villa', error });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
