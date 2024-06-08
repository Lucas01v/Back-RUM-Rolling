const express = require('express')
const authController = require('../Controller/authController');
// const getAllUsers = require('../Controller/userController');

const authRouter = express.Router(); // ?

//Autenticaciónde login
authRouter.post('/login', authController.login);



module.exports = authRouter;