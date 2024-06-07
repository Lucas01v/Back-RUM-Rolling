const express = require('express');
const { getAllUsers, registerUser} = require('../Controller/userController'); //controlador

const userRouter = express.Router();

//Listar usuarios
userRouter.get('/user', getAllUsers);
userRouter.post('/register', registerUser);

module.exports = userRouter;