const Sequelize  = require("sequelize");
const connection = require('../../database/databaseConnection.js');

const Product = connection.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    freight: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{ 
    freezeTableName: true,
    timestamps: false 
});

module.exports = Product ;