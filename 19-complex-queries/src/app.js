const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paginate = require('express-paginate');

const auth = require('./auth');
const httpLogger = require('./httpLogger');

const app = express();

app.use(httpLogger);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(paginate.middleware(10, 50));
app.use(auth.initialize());

app.use('/tweets', require('./tweets/routes'));
app.use('/users', require('./users/routes'));

// Routes
app.use('/', (req, res) => {
  const { API_BASE_URL, PORT } = process.env;
  res.json({
    message: `I am working! and you are connected at ${API_BASE_URL}:${PORT}`
  });
});

module.exports = app;
