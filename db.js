const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());

// Remplacez par votre propre URL de connexion
const connectionString = 'postgresql://postgres.vmlibxqkeluppiomwmfr:MasterSIRHSIFA06@aws-0-eu-west-3.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => console.log('Connexion à PostgreSQL réussie'))
  .catch(err => console.error('Erreur de connexion à PostgreSQL', err.stack));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
