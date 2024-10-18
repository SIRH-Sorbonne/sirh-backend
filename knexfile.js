require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
