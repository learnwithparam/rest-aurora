const express = require('express');

const app = express(); // Create an express app instance

app.use('/', (req, res) => {
  const { API_BASE_URL, PORT } = process.env;
  res.json({
    message: `I am working! and you are connected at ${API_BASE_URL}:${PORT}`
  });
});

module.exports = app;
