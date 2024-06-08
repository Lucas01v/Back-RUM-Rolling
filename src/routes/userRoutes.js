const express = require('express');
const { getAllUsers, registerUser, getUserPets} = require('../Controller/userController');
const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación

const userRouter = express.Router();

//Listar usuarios
userRouter.get('/users', getAllUsers);
userRouter.post('/register', registerUser);
userRouter.get('/:userId/pets', authMiddleware, getUserPets);

module.exports = userRouter;