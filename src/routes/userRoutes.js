const express = require('express');
const { registerUser, getUserPets} = require('../Controller/userController');
const { createAppointment, getAppointments, getAppointmentsByDate, cancelAppointment} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const { adoptPet, listAdoptablePets, getAdoptionsByUserId, getAllAdoptions, } = require('../Controller/adoptionController');

const userRouter = express.Router();


userRouter.get('/:userId/pets', getUserPets);


userRouter.post('/:userId/new_appointment', authMiddleware, createAppointment); 
userRouter.get('/:userId/get_appointments', authMiddleware, getAppointments);  
userRouter.get('/:userId/appointments_date', authMiddleware, getAppointmentsByDate); 
userRouter.delete('/:userId/:appointmentId', authMiddleware, cancelAppointment);


userRouter.get('/:userId/adoption', getAdoptionsByUserId);
userRouter.get('/adoption/adopt_pets', authMiddleware, listAdoptablePets);
userRouter.post('/adoption/adopt', authMiddleware, adoptPet);

module.exports = userRouter;