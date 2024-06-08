const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    species: {
        type: String,
        required: true,
        enum: ['canine', 'feline'] // Asegura que solo se permiten estos dos valores
    },
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
    },
    sex: {
        type: String,
        required: true,
        enum: ['male','female']
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now // Asigna automáticamente la fecha y hora actual
    }
}, { collection: 'pets' });

module.exports = mongoose.model('Pet', petSchema);