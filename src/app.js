const express = require('express');
const morgan = require('morgan');
const adoptionRouter = require('./routes/adoptionRoute');
const authRoute = require('./routes/authRoute'); //
const connectDB = require('./config/db');//conexión a la bd

const app = express();
app.use(morgan('combined'));

const cors = require('cors');
require('dotenv').config();


// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:5173'],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Conecta la BD
connectDB(); 

// Middleware para parsear JSON
app.use(express.json());

//rutas
app.use('/api/auth', authRoute);
app.use('/adoptions', adoptionRouter);


// Iniciar el servidor
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

