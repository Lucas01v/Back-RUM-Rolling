const mongoose = require('mongoose');

// Esquema para las citas
const appointmentSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true, 
        enum: ['neutering', 'vaccination'] 
    },
    date: { 
        type: Date, 
        required: true 
    },
    pet: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet', 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
