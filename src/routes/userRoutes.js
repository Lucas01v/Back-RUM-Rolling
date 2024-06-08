const express = require('express');
const { registerUser, getUserPets} = require('../Controller/userController');
const { createAppointment, getAppointments} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/:userId/pets', authMiddleware, getUserPets);

userRouter.post('/:userId/new_appointment', authMiddleware, createAppointment);
userRouter.get('/:userId/get_appointments', authMiddleware, getAppointments);

module.exports = userRouter;