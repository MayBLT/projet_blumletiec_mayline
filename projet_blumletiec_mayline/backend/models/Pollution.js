
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modèle Pollution correspondant au schéma SQL des TP précédents.
const Pollution = sequelize.define('Pollution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    codePostal: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'code_postal'
    },
    ville: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    pays: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rue: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    numero: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    photoUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'photo_url'
    }
}, {
    tableName: 'pollution',
    timestamps: false,
    freezeTableName: true
});

module.exports = Pollution;
