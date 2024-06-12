const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const User = require('../models/User');

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

const getAppointmentsByDate = async (req, res) => { 
    const userId = req.params.userId;
    const date = req.query.date; // Obtener la fecha desde la consulta

    try {
        // Validar que se ha proporcionado una fecha
        if (!date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        const parsedDate = new Date(date);

        // Verificar si la fecha es válida
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const appointments = await Appointment.find({ user: userId, date: { $eq: parsedDate } }).populate('pet'); // Buscar citas del usuario para la fecha específica y popular la información de la mascota

        // Verificar si no hay citas para esa fecha
        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for the specified date' });
        }

        res.json(appointments); // Enviar respuesta con las citas
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta con error
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Verificar si el turno existe
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        // Eliminar el turno
        await Appointment.findByIdAndDelete(appointmentId);

        res.status(200).json({ message: 'Turno eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {createAppointment, getAppointments, getAllAppointments, getAppointmentsByDate, cancelAppointment};