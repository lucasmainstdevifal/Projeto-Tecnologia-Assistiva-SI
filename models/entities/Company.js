const Sequelize  = require("sequelize");
const connection = require('../../database/databaseConnection.js');

const Company = connection.define('company', {
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
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{ 
    freezeTableName: true,
    timestamps: false 
});

// Um User está vinculado a pelo menos 1 Órgão
// User.belongsTo(Organ, { foreignKey: 'OrganId' });

module.exports = Company ;