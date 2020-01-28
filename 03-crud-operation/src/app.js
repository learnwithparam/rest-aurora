const express = require('express');

const app = express();
const bodyParser = require('body-parser'); // Body parser package helps to parse the body content

// Body parser middleware for parsing URL encoded format
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
// Body parser middleware for parsing JSON format
app.use(bodyParser.json({ limit: '10mb' }));

const tweets = [
  {
    text: 'first tweet'
  },
  {
    text: 'second tweet'
  },
  {
    text: 'third tweet'
  }
];

app.post('/post-tweet', (req, res) => {
  // TODO: Create a tweet
});

app.get('/get-tweets', (req, res) => {
  // TODO: Read all tweets
});

app.get('/get-tweet/:id', (req, res) => {
  // TODO: Read a tweet
});

app.put('/put-tweet/:id', (req, res) => {
  // TODO: Update a tweet
});

app.delete('/delete-tweet/:id', (req, res) => {
  // TODO: Delete a tweet
});

module.exports = app;
