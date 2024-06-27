const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
        default : null
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
   /*  isAdoptable: { 
        type: Boolean, default: false // Indica si la mascota está disponible para adopción
    }, */
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