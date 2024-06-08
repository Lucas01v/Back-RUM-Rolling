const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');

// Crear una nueva cita
exports.createAppointment = async (req, res) => {
    const { type, date, petId } = req.body;
    try {
        const pet = await Pet.findById(petId); // Buscar la mascota por ID
        if (!pet || pet.owner.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Invalid pet' }); // Mascota no válida o no pertenece al usuario
        }
        const appointment = await Appointment.create({ type, date, pet: petId, user: req.user.id }); // Crear nueva cita
        res.status(201).json(appointment); // Enviar respuesta con la nueva cita
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta con error
    }
};

// Obtener todas las citas del usuario
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id }).populate('pet'); // Buscar citas del usuario y popular la información de la mascota
        res.json(appointments); // Enviar respuesta con las citas
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta con error
    }
};
