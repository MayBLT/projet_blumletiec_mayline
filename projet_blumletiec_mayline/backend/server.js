require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

// Route de vérification de l'API.
app.get('/', (req, res) => {
  res.json({ message: 'API pollution opérationnelle' });
});

// Récupère toutes les pollutions enregistrées dans PostgreSQL.
app.get('/pollution', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id, titre, type, description, date,
        code_postal AS "codePostal",
        ville, pays, rue, numero, latitude, longitude,
        photo_url AS "photoUrl"
      FROM pollution
      ORDER BY id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des pollutions :', error);
    res.status(500).json({
      erreur: 'Impossible de récupérer les pollutions.'
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API démarrée sur le port ${port}`);
});
