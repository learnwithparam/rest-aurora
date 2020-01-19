const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Routes
app.use('/', (req, res) => {
  const { API_BASE_URL, PORT } = process.env;
  res.json({
    message: `I am working! and you are connected at ${API_BASE_URL}:${PORT}`
  });
});

module.exports = app;
