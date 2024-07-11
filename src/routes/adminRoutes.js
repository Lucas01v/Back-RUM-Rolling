const express = require('express');
const { getAllUsers, deleteUser, updateUser } = require('../Controller/userController');
const { getAllAppointments, cancelAppointment} = require('../Controller/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllPets, deletePet, updatePet } = require('../Controller/petController');
const { getAllAdoptions, updateAdoption, deleteAdoption } = require('../Controller/adoptionController');
const checkRole = require('../middleware/validationRole');

const adminRouter = express.Router();


adminRouter.get('/users', authMiddleware, checkRole(['admin']), getAllUsers); 
adminRouter.delete('/users/delete', authMiddleware, checkRole(['admin']), deleteUser); 
adminRouter.patch('/users/update/:userId',authMiddleware, checkRole(['admin']), updateUser); 


adminRouter.get('/pets', authMiddleware, checkRole(['admin']), getAllPets); 
adminRouter.delete('/pets/delete/:id', authMiddleware, checkRole(['admin']), deletePet); 
adminRouter.patch('/pets/update/:id', authMiddleware, checkRole(['admin']), updatePet);


adminRouter.get('/appointments', authMiddleware, checkRole(['admin']), getAllAppointments); 
adminRouter.delete('/appointments/delete/:appointmentId', cancelAppointment);


adminRouter.get('/adoption/adopts', authMiddleware, checkRole(['admin']), getAllAdoptions); 
adminRouter.patch('/adoption/update/:id', authMiddleware, checkRole(['admin']), updateAdoption);
adminRouter.delete('/adoption/delete/:id', authMiddleware, checkRole(['admin']), deleteAdoption);


module.exports = adminRouter;