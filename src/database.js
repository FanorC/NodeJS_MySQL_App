

const mysql = require('mysql')
const {database}= require('./keys')
const pool = mysql.createPool(database)
const {promisify} = require('util')

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    };
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    };
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    };
  };

  if (connection) connection.release();
    console.log('Database connection ok');
  return;
});

// Promisify for Node.js async/await.
pool.query = promisify(pool.query);

module.exports = pool;
