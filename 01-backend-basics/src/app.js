const express = require('express');

const app = express(); // Create an express app instance

// Log the request time using express middleware
app.use((req, res, next) => {
  // Add the time to req.requestTime
});

app.use('/', (req, res) => {
  // Send the request time as JSON
});

module.exports = app;
