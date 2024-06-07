const express = require('express');
const { getAllUsers, registerUser, getUserPets} = require('../Controller/userController'); //controlador

const userRouter = express.Router();

//Listar usuarios
userRouter.get('/users', getAllUsers);
userRouter.post('/register', registerUser);
userRouter.get('/:userId/pets', getUserPets);

module.exports = userRouter;