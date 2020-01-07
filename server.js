const dotenv = require('dotenv');
const http = require('http');

// Configuration
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = require('./src/app');

const port = process.env.PORT || 4000;
const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}\n`);
});
