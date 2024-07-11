const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


require('dotenv').config();


const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express(); 

app.use(morgan('combined'));


app.use(morgan('combined'))
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://pet-web-portal.netlify.app'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/pet', petRoutes);
app.use('/user', userRouter);
app.use('/auth', authRoutes);
app.use('/admin', adminRouter);

connectDB(); 

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

