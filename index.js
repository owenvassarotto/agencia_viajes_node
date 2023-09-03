// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar a la db
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

// Definir puerto como variable de entorno
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual con app.use - middleware
app.use( (req, res, next) => {

    const year = new Date();

    res.locals.actualYear = year.getFullYear();

    res.locals.nombreSitio = 'Agencia de Viajes';

    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Arranca el servidor con .listen
app.listen(port ,() => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
})

