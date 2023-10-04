const Sequelize = require("sequelize");
require("dotenv").config({ path: __dirname + '/../.env' });

const DB_NAME     = process.env.DB_NAME;
const DB_USER     = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST     = process.env.DB_HOST;
const DB_PORT     = process.env.DB_PORT;
const DB_DIALECT  = process.env.DB_DIALECT;

// Configuração base de conexão com o Banco de Dados
const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: false, // Retirar Log de Queris no ORM Sequelize para não sobrecarregar os logs
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  timezone: "-03:00"
});


module.exports = connection;
