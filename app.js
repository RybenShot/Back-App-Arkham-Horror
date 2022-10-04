'use strict'

const express = require('express')
const database = require('./modules/database')
const cors = require("cors");

//middlewares con las rutas
// const indexController = require('./controllers/IndexController')

//server instance
const app = express()

// Para poder usar la api, nose para qeu sirve exactamente
app.use(cors())

//middleware para parsear los cuerpos tipo application/JSON en el cuerpo
app.use(express.json())

//enganchamos los controladores de los diferentes recursos
// 

// Conectamos a la base de datos de mongoDb
database.connect()

module.exports = app
