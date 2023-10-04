const Sequelize  = require("sequelize");
const connection = require('../../database/databaseConnection.js');
//const Organ      = require("../Entities/Organ.js");

const User = connection.define('user', {
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
    userType:{
        type: Sequelize.ENUM,
        values: ['Admin','Escola','Orgao','User','Secretaria'],
        allowNull: false
    },
    nameSchool:{
        type: Sequelize.STRING,
        allowNull: true
    },
    nameOrgan:{
        type: Sequelize.STRING,
        allowNull: true
    },
    statusAcess:{
        type: Sequelize.ENUM,
        values: ['Acesso solicitado' ,'Desativado','Em validação','Ativado'],
        allowNull: false
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: Sequelize.DATE,
        allowNull: true
    },
    notificationToken: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{ 
    freezeTableName: true,
    timestamps: false 
});

// Um User está vinculado a pelo menos 1 Órgão
// User.belongsTo(Organ, { foreignKey: 'OrganId' });

module.exports = User ;