const express = require('express');
const { getAllUsers, deleteUser, updateUser } = require('../Controller/userController');
const { getAllAppointments, cancelAppointment} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación
const { getAllPets, deletePet, updatePet } = require('../Controller/petController');
const { getAllAdoptions, updateAdoption, deleteAdoption } = require('../Controller/adoptionController');
const checkRole = require('../middleware/validationRole');

const adminRouter = express.Router();

//Usuarios
adminRouter.get('/users', authMiddleware, checkRole(['admin']), getAllUsers); //Listar todos los usuarios
adminRouter.delete('/users/delete', authMiddleware, checkRole(['admin']), deleteUser); //Eliminar usuarios
adminRouter.patch('/users/update/:userId',authMiddleware, checkRole(['admin']), updateUser); //Editar usuarios

//Mascotas
adminRouter.get('/pets', authMiddleware, checkRole(['admin']), getAllPets); //Listar todas las mascotas
adminRouter.delete('/pets/delete/:id', authMiddleware, checkRole(['admin']), deletePet); //Eliminar mascota
adminRouter.patch('/pets/update/:id', authMiddleware, checkRole(['admin']), updatePet); //Editar mascota

//Turnos
adminRouter.get('/appointments', authMiddleware, checkRole(['admin']), getAllAppointments); //Listar todos los turnos
adminRouter.delete('/appointments/delete/:appointmentId', cancelAppointment); //Eliminar turno

//Adopciones
adminRouter.get('/adoption/adopts', authMiddleware, checkRole(['admin']), getAllAdoptions); //Listar todas las adopciones
adminRouter.patch('/adoption/update/:id', authMiddleware, checkRole(['admin']), updateAdoption); //Editar adopciones
adminRouter.delete('/adoption/delete/:id', authMiddleware, checkRole(['admin']), deleteAdoption); //Eliminar adopción


module.exports = adminRouter;