'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas
var project_routes = require('./routes/projects');
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

//rutas
app.use('/api', project_routes);

//exportar
module.exports = app;