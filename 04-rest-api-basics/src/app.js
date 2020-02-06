const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
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

app.post('/tweets', (req, res) => {
  const { text = '' } = req.body;

  if (!text) {
    res.status(400).json({
      message: 'Bad Request, Invalid text'
    });
  }

  tweets.push({ text }); // Push to the tweets array

  res.json({ data: tweets[tweets.length - 1], message: 'Tweet Created' });
});

app.get('/tweets', (req, res) => {
  res.json({ data: tweets });
});

app.get('/tweets/:id', (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  res.json({ data: tweets[id] });
});

app.put('/tweets/:id', (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  const { text = '' } = req.body;
  if (!text) {
    res.status(400).json({
      message: 'Bad Request, Invalid text'
    });
  }

  tweets[id].text = text; // Update the tweet text

  res.json({ data: tweets[id], message: 'Tweet Updated' });
});

app.delete('/tweets/:id', (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  tweets.splice(id, 1); // Delete the tweet from the array
  res.json({ message: 'Tweet Deleted' });
});

module.exports = app;
