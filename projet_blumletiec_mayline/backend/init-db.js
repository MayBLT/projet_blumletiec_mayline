require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('La variable DATABASE_URL est absente.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

async function initialiserBase() {
  try {
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );

    await pool.query(schema);
    console.log('Table pollution créée ou déjà présente.');
  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

initialiserBase();
