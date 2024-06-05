const mongoose = require('mongoose');
require('dotenv').config();
const connectdb = async () => {

    try {
        //conexión a la DB
        const mongoUrl = process.env.MONGO_URL;
        const connect = await mongoose.connect(mongoUrl)
        console.log(`Conexión exitosa a la DB ${connect.connection.host}`) //variable de la instancia declarada arriba
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message); // Mensaje de error en la conexión
        process.exit(1); //
    }

};

module.exports = connectdb;