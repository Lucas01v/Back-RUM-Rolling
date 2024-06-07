const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db');//conexión a la bd
const verifyToken = require('./middlewares/verifyToken');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

const app = express(); 

app.use(morgan('combined'));

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:${PORT}', // Reemplaza con el dominio que necesites permitir
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

//Conecta la BD
connectDB(); 

// Middleware para parsear JSON
app.use(express.json());


//Rutas
app.use('/', userRoute);
app.use('/api/auth', authRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

