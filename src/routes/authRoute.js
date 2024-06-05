const express = require('express')
const authController = require('../Controller/authController');
// const getAllUsers = require('../Controller/userController');

const authRoute = express.Router(); // ?

//Autenticaciónde login
authRoute.post('/register', authController.register);


module.exports = authRoute;