const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.get('/show', (req, res) => {
  res.json({
    data: tweets
  });
});

app.get('/get', (req, res) => {
  const { id } = req.query;

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

app.post('/post', (req, res) => {
  const { tweet } = req.body;
  tweets.push({ text: tweet });
  res.json({
    data: tweet
  });
});

app.put('/put/:id', (req, res) => {
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

app.delete('/delete/:id', (req, res) => {
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

app.get('/', (req, res) => {
  const { format = 'json' } = req.query;

  if (format === 'html') {
    res.send(`<!DOCTYPE html>
    <html>
      <body>
        <h1>Hello Param</h1>
        <p>Mr. Josh, How are you?</p>
      </body>
    </html>`);
  }

  res.json({ text: 'send json data' });
});

app.get('/custom-headers', (req, res) => {
  res.set('name', 'Josh');
  res.json({
    statusCode: res.statusCode
  });
});

module.exports = app;
