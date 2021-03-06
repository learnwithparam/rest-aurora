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

app.get('/get', (req, res) => {
  // TODO 1: Display all messages
  // TODO 2: Read from URL query params
});

app.post('/post', (req, res) => {
  // TODO: Create new message
});

app.put('/put/:id', (req, res) => {
  // TODO 1: Read from url params
  // TODO 2: Update a message based on the id received from URL
  // TODO 3: Error response if ID not found
});

app.delete('/', (req, res) => {
  // TODO: Show the power of delete :)
});

/**
 * 
Example HTML:

<!DOCTYPE html>
<html>
  <body>
    <h1>Hello Param</h1>
    <p>Mr. Josh, How are you?</p>
  </body>
</html>
 */
app.get('/html', (req, res) => {
  // TODO: Send the above sample HTML
});

app.get('/custom-headers', (req, res) => {
  // TODO 1: Set a custom header to the response
  // TODO 2: Receive a custom header from request and console it
});

module.exports = app;
