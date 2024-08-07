const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default : null
    },
    species: {
        type: String,
        required: true,
        enum: ['canino', 'felino'] 
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
        enum: ['macho','hembra']
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
        default: Date.now
    }
}, { collection: 'pets' });

module.exports = mongoose.model('Pet', petSchema);