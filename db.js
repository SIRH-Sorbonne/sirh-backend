const knex = require('knex');
const { attachOnExitListener } = require('./utils/dbUtils');
const dotenv = require('dotenv');
dotenv.config();

const knexConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    charset: 'utf8mb4',
  },
  pool: { min: 2, max: 20 },
  acquireConnectionTimeout: 10000
};

const db = knex(knexConfig);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

attachOnExitListener(db);

module.exports = db;
