const http = require('http');
const app = require('./src/app');

const port = 4000;
const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}\n`);
});