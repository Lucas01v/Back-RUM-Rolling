const express = require('express');
const getAllUsers = require('../Controller/userController'); //controlador

const userRouter = express.Router();

//Listar usuarios
userRouter.get('/api/user', getAllUsers)

module.exports = userRouter;