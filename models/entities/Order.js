const Sequelize  = require("sequelize");
const connection = require('../../database/databaseConnection.js');

const Order = connection.define('order', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    listProducts: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    statusOrder:{
        type: Sequelize.ENUM,
        values: ['Concluído','Em Análise','Cancelado'],
        allowNull: false
    },
},{ 
    freezeTableName: true,
    timestamps: false 
});

module.exports = Order ;