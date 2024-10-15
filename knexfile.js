const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    client: 'mysql2',
    connection: {
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        charset: 'utf8mb4',
      },
    migrations: {
      directory: './migrations',
    },
  };
