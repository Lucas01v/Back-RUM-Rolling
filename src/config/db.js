const mongoose = require('mongoose');
require('dotenv').config();
const connectdb = async () => {

    try {
       
        const mongoUrl = process.env.MONGO_URL;
        const connect = await mongoose.connect(mongoUrl)
        console.log(`Conexión exitosa a la DB ${connect.connection.host}`)
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message); 
        process.exit(1); 
    }

};

module.exports = connectdb;