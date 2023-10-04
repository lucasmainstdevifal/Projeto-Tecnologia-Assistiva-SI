const config = require('./config/config.js')

// Set port, listen for requests
const PORT = process.env.PEDIDOS_PORT || 6868;
const SIGLA = process.env.SIGLA_ENTIDADE;

const express = require('express');
const app = express();

config
  .then(app => app.listen(PORT, (error) => {
    if (error) {
      console.log("O servidor está com algum defeito!");
    } else {
      console.log(`Servidor rodando na porta [ ${PORT} ] - Pedidos Assistivos [ ${SIGLA} ]`);
    }
  }))
  .catch(erro => console.log(erro))