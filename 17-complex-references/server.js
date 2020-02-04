const dotenv = require('dotenv');
const http = require('http');
const mongoose = require('mongoose');

// Configuration
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = require('./src/app');

const port = process.env.PORT || 4000;
const server = http.Server(app);

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/microtwits',
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.connection
  .once('open', async () => {
    console.log('mongodb connection open');
  })
  .on('error', err => {
    console.log(err);
  });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    server.close();
  });
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}\n`);
});
