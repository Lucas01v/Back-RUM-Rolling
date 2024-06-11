const express = require('express');
const { registerUser, getUserPets} = require('../Controller/userController');
const { createAppointment, getAppointments, getAppointmentsByDate, cancelAppointment} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación
const { adoptPet, getAdoptionsByUserId } = require('../Controller/adoptionController');

const userRouter = express.Router();

//MASCOTAS
userRouter.get('/:userId/pets', authMiddleware, getUserPets);

//TURNOS (modificar ruta el nombre y probar)
userRouter.post('/:userId/new_appointment', authMiddleware, createAppointment);
userRouter.get('/:userId/get_appointments', authMiddleware, getAppointments);
userRouter.get('/:userId/appointments_date', authMiddleware, getAppointmentsByDate);
userRouter.delete('/:userId/:appointmentId', authMiddleware, cancelAppointment);

//ADOPCIÓN
userRouter.post('/adoption/adopt', authMiddleware, adoptPet);
userRouter.get('/adoption', authMiddleware, getAdoptionsByUserId);

module.exports = userRouter;