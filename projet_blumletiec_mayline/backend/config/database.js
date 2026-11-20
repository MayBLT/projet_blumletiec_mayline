
const { Sequelize } = require('sequelize');

// Connexion à la base PostgreSQL hébergée sur Render.
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',

    // Render nécessite une connexion SSL.
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },

    logging: false
});

module.exports = sequelize;
