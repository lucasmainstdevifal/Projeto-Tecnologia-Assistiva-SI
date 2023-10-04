const Sequelize  = require("sequelize");
const connection = require('../../database/databaseConnection.js');

const Client = connection.define('client', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{ 
    freezeTableName: true,
    timestamps: false 
});

module.exports = Client ;