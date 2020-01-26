const express = require('express');

const app = express();

// Log the request time using express middleware
app.use((req, res, next) => {
  // TODO: Add the time to req.requestTime
});

app.use('/', (req, res) => {
  // TODO: Send the request time as JSON
});

module.exports = app;
