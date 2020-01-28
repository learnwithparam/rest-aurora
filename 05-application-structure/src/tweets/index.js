const express = require('express');
const router = express.Router();

// TODO 1: Create Model for data

// TODO 2: Create routes to handle correct requests

// TODO 3: Create controller for each routes to send a proper response

// TODO 4: Create a service for controller to talk to the data model

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

router.post('/', (req, res) => {
  const { text = '' } = req.body;
  if (!text) {
    res.status(400).json({
      message: 'Bad Request, Invalid text'
    });
  }

  tweets.push({ text }); // Push to the tweets array

  res.json({ data: tweets[tweets.length - 1], message: 'Tweet Created' });
});

router.get('/', (req, res) => {
  res.json({ data: tweets });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  res.json({ data: tweets[id] });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (id > tweets.length - 1) {
    req.status(404).json({ message: 'Tweet ID not found' });
  }

  tweets.splice(id, 1); // Delete the tweet from the array
  res.json({ message: 'Tweet Deleted' });
});

module.exports = router;
