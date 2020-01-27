const express = require('express');

const app = express();

// Log the request time using express middleware
app.use((req, res, next) => {
  // TODO: Add the time to req.requestTime
  next();
});

app.use('/', (req, res) => {
  // TODO: Display the request time on root endpoint
});

module.exports = app;
