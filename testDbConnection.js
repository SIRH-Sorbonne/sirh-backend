const { Client } = require('pg');

// Remplacez par votre propre URL de connexion
const connectionString = 'postgresql://postgres.vmlibxqkeluppiomwmfr:MasterSIRHSIFA06@aws-0-eu-west-3.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
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
