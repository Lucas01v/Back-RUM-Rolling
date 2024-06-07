const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');//conexión a la bd
const petRouter = require('./routes/petRoutes');

require('dotenv').config();
// const petRoutes = require('./routes/petRoutes');


const app = express();

app.use(morgan('combined'))
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:${PORT}',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/pet', petRouter);




connectDB(); 

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});