const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true, 
        enum: ['Antirrabico', 'Antiparasitario'] 
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
