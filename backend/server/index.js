require('dotenv').config()
const app = require('./app');
// const db = require('../db')

const server = app.listen(process.env.PORT || 3000);

const cleanup = () => {
  server.close(function() {
      console.log('Server stopped.');
      process.exit();
  });
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

module.exports = server;