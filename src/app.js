const express = require('express');
// const mongoose = require('mongoose');
const connectDB = require('./config/db');//conexión a la bd
var cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const petRouter = require('./routes/petRoutes');
const morgan = require('morgan');
require('dotenv').config();
// const petRoutes = require('./routes/petRoutes');


const app = express();

app.use(morgan('combined'))

//Conecta la BD
connectDB(); 

// Middleware para parsear JSON
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));
/* // Conexión a MongoDB

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
    .then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
}); */


// Usar las rutas de usuario
app.use('/user',userRoutes);
app.use('/pet', petRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});