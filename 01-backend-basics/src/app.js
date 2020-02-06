const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// Log the request time using express middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', (req, res, next) => {
  res.json({
    data: {
      requestTime: `${req.requestTime}`
    }
  });
});

module.exports = app;
