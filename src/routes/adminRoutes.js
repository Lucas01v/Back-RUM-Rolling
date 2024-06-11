const express = require('express');
const { getAllUsers, deleteUser } = require('../Controller/userController');
const { getAllAppointments} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación
const { getAllPets } = require('../Controller/petController');

const adminRouter = express.Router();

adminRouter.get('/pets', authMiddleware, getAllPets);
adminRouter.get('/users', authMiddleware, getAllUsers);
adminRouter.get('/appointments', authMiddleware, getAllAppointments);

adminRouter.delete('/users', authMiddleware, deleteUser);

module.exports = adminRouter;