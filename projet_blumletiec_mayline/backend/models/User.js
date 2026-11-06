const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modèle représentant un utilisateur de l'application.
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    motDePasse: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'mot_de_passe'
    }
}, {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true
});

module.exports = User;