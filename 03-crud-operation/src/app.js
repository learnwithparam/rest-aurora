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
  const { tweet } = req.body;
  tweets.push({ text: tweet });
  res.json({
    data: tweet
  });
});

app.get('/get-tweets', (req, res) => {
  res.json({
    data: tweets
  });
});

app.get('/get-tweet/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.json({
      error: 'undefined id'
    });
  }

  if (id > tweets.length - 1) {
    res.json({
      error: "tweet doesn't exist"
    });
  }

  res.json({
    data: tweets[id]
  });
});

app.put('/put-tweet/:id', (req, res) => {
  const { id } = req.params;
  const { tweet } = req.body;

  if (id > tweets.length - 1) {
    res.json({
      error: "tweet doesn't exist"
    });
  }

  tweets[id] = { text: tweet };

  res.json({
    data: tweets[id]
  });
});

app.delete('/delete-tweet/:id', (req, res) => {
  const { id } = req.params;

  if (id > tweets.length - 1) {
    res.json({
      error: "tweet doesn't exist"
    });
  }

  tweets.splice(id, 1);

  res.json({
    data: `tweet at index ${id} removed`
  });
});

module.exports = app;
