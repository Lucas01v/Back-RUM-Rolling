const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const User = require('../models/User');


const createAppointment = async (req, res) => {
    const userId = req.params.userId;
    const { type, date, petId } = req.body;
    try {
        const pet = await Pet.findById(petId); 
        if (!pet || pet.owner.toString() !== userId) {
            return res.status(400).json({ message: 'Invalid pet' });
        }
        const appointment = await Appointment.create({ type, date, pet: petId, user: userId }); 
        res.status(201).json(appointment); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};


const getAppointments = async (req, res) => {
    const userId = req.params.userId;
    try {
        const appointments = await Appointment.find({ user: userId }).populate('pet'); 
        res.json(appointments); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('pet');
        res.json(appointments); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

const getAppointmentsByDate = async (req, res) => { 
    const userId = req.params.userId;
    const date = req.query.date; 

    try {
        
        if (!date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        const parsedDate = new Date(date);

        
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const appointments = await Appointment.find({ user: userId, date: { $eq: parsedDate } }).populate('pet'); 

        
        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for the specified date' });
        }

        res.json(appointments); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        
        await Appointment.findByIdAndDelete(appointmentId);

        res.status(200).json({ message: 'Turno eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {createAppointment, getAppointments, getAllAppointments, getAppointmentsByDate, cancelAppointment};