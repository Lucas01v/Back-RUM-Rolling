const express = require('express');
const { registerUser, getUserPets} = require('../Controller/userController');
const { createAppointment, getAppointments, getAppointmentsByDate, cancelAppointment} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación

const userRouter = express.Router();

//Rutas
userRouter.get('/:userId/pets', authMiddleware, getUserPets); //?

//TURNOS
userRouter.post('/:userId/new_appointment', authMiddleware, createAppointment);
userRouter.get('/:userId/get_appointments', authMiddleware, getAppointments);
userRouter.get('/:userId/appointments_date', authMiddleware, getAppointmentsByDate);
userRouter.delete('/:userId/:appointmentId', authMiddleware, cancelAppointment);

//ADOPCIÓN


module.exports = userRouter;