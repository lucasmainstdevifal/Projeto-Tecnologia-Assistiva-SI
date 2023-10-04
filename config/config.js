const express         = require('express')
const app             = express()
const bodyParser      = require('body-parser');
const cors            = require('cors');
const session         = require("express-session");
const ejs             = require('ejs');
const consign         = require('consign')
const dataTables      = require('../database/gen/dataTables.js')
const connection      = require('../database/databaseConnection.js')

// Manipulação de Arquivos
const fs              = require("fs");
var jsonfile          = require('jsonfile');
var path              = require('path');


module.exports = new Promise((resolve, reject) => {

    connection
    .authenticate()
    .then(() => {

        // Body-Parser
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json({limit:'50mb'}));
        app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

        // Static
        app.use(express.static("public"));
        app.use(express.static("public/music"));
        
        // View Engine
        app.set("view engine", "ejs");

        // Sessions
        app.use(session({
            secret:'3s@dgsdg5r@335735@-@p-@;cazs@a*-+asz@',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false } 
        }));
        
        // Cors
        app.use(cors());
        
        consign({ verbose: false }).include('controllers').into(app)

        dataTables.init()

        resolve(app);
        console.log("-> Conexão com a base de dados feita com sucesso!");
    })
    .catch((error) => {
        console.log(error);
    });

})