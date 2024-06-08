const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');

// Crear una nueva cita
const createAppointment = async (req, res) => {
    const userId = req.params.userId;
    const { type, date, petId } = req.body;
    try {
        const pet = await Pet.findById(petId); // Buscar la mascota por ID
        if (!pet || pet.owner.toString() !== userId) {
            return res.status(400).json({ message: 'Invalid pet' }); //Mascota no válida o no pertenece al usuario
        }
        const appointment = await Appointment.create({ type, date, pet: petId, user: userId }); // Crear nueva cita
        res.status(201).json(appointment); // Enviar respuesta con la nueva cita
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta con error
    }
};

// Obtener todas las citas del usuario
const getAppointments = async (req, res) => {
    const userId = req.params.userId;
    try {
        const appointments = await Appointment.find({ user: userId }).populate('pet'); // Buscar citas del usuario y popular la información de la mascota
        res.json(appointments); // Enviar respuesta con las citas
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta con error
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('pet'); // Obtener todas las citas y popular la información de la mascota
        res.json(appointments); // Enviar respuesta con las citas
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta con error
    }
};

module.exports = {createAppointment, getAppointments, getAllAppointments};