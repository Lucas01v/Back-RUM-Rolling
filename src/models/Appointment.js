const mongoose = require('mongoose');

// Esquema para las citas
const appointmentSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['castration', 'vaccination'] }, // Tipo de cita (castración o vacunación)
    date: { type: Date, required: true }, // Fecha de la cita
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }, // Referencia a la mascota
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que solicita la cita
});

module.exports = mongoose.model('Appointment', appointmentSchema);
