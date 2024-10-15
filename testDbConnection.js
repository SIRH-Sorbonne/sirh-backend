const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.SUPABASE_URL);
const client = new Client({
  connectionString: process.env.SUPABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connexion à PostgreSQL réussie');

    // Exemple de requête pour tester la connexion
    const res = await client.query('SELECT NOW()');
    console.log('Heure actuelle de la base de données:', res.rows[0].now);

  } catch (err) {
    console.error('Erreur de connexion à PostgreSQL', err.stack);
  } finally {
    await client.end();
    console.log('Connexion à PostgreSQL fermée');
  }
}

testConnection();