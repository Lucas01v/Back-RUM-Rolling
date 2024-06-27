const express = require('express');
const { registerUser, getUserPets} = require('../Controller/userController');
const { createAppointment, getAppointments, getAppointmentsByDate, cancelAppointment} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación
const { adoptPet, listAdoptablePets, getAdoptionsByUserId, getAllAdoptions, } = require('../Controller/adoptionController');

const userRouter = express.Router();

//MASCOTAS
userRouter.get('/:userId/pets', getUserPets); //Listar mascotas de un usuario 

//TURNOS (modificar ruta el nombre y probar)
userRouter.post('/:userId/new_appointment', authMiddleware, createAppointment); //Crear turno de usuario
userRouter.get('/:userId/get_appointments', authMiddleware, getAppointments);   //Listar todos los turnnos de usuario
userRouter.get('/:userId/appointments_date', authMiddleware, getAppointmentsByDate); //Listar turnos de usuario por fecha
userRouter.delete('/:userId/:appointmentId', authMiddleware, cancelAppointment); //Cancelar Turno

//ADOPCIÓN
userRouter.get('/:userId/adoption', getAdoptionsByUserId) //Listar adopciones por ID de usuario
userRouter.get('/adoption/adopt_pets', authMiddleware, listAdoptablePets); //Listar mascotas en adopción (sin dueño asignado)
userRouter.post('/adoption/adopt', authMiddleware, adoptPet); //Solicitar adopción

module.exports = userRouter;