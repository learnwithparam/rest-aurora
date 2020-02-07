const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/tweets', require('./tweets/routes'));

// Error Handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

module.exports = app;
