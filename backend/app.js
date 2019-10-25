require('dotenv').config();

const express = require('express');

const requireEnv = require('./utils/requireEnv');

// requireEnv(['DATABASE_URL', 'CLOUDINARY_URL', 'JWT_SECRET']);

requireEnv(['DATABASE_URL']);

// const auth = require('./authentication/auth');
const api = require('./api');
const cors = require('./utils/cors');

const {
  PORT: port = 5000,
  HOST: host = '127.0.0.1',
} = process.env;

const app = express();
app.use(express.json());

// CORS til að geta gert ajax beiðnir frá öðrum serverum
app.use(cors);

// app.use(auth);
app.use('/', api);

function notFoundHandler(req, res, next) { // eslint-disable-line
  console.warn('Not found', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  if (host) {
    console.info(`Server running at http://${host}:${port}/`);
  }
});
