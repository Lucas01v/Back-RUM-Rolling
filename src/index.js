const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


require('dotenv').config();
// const petRoutes = require('./routes/petRoutes');

const connectDB = require('./config/db');//conexión a la bd
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express(); 

app.use(morgan('combined'));

// Configurar CORS

app.use(morgan('combined'))
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/pet', petRoutes);
app.use('/user', userRouter);
app.use('/auth', authRoutes);
app.use('/admin', adminRouter);

connectDB(); 

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

