
// Chargement des variables d'environnement.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');
const User = require('./models/User');

const pollutionsRoutes = require('./routes/pollutions');
const usersRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3001;

// Autorise les requêtes provenant du frontend Angular.
app.use(cors());

// Permet à Express de lire les données JSON.
app.use(express.json());

// Route de vérification de l'API.
app.get('/', (req, res) => {
    res.json({
        message: 'API pollution opérationnelle'
    });
});

// Branchement des routes REST.
app.use('/api/pollutions', pollutionsRoutes);
app.use('/api/users', usersRoutes);

// Démarrage du serveur après vérification de la base.
async function startServer() {
    try {
        // Vérification de la connexion PostgreSQL.
        await sequelize.authenticate();
        console.log('Connexion PostgreSQL établie.');

        // Crée la table users uniquement si elle n'existe pas.
        await User.sync();
        console.log('Table users vérifiée.');

        // Démarrage du serveur Express.
        app.listen(port, '0.0.0.0', () => {
            console.log(`API démarrée sur le port ${port}`);
        });

    } catch (error) {
        console.error('Erreur de démarrage de l API :', error);
        process.exit(1);
    }
}

startServer();
