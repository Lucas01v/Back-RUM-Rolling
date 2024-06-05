const express = require('express');
const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');
const authRoute = require('./routes/authRoute');
const app = express();
require('dotenv').config();



// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
    .then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
});


// Usar las rutas de usuario
// app.use('/user',userRoutes);
app.use('/api/auth', authRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});