const express = require('express')
const authController = require('../controllers/authController');
// const getAllUsers = require('../Controller/userController');

const authRoute = express.Router(); // ?

//Autenticaciónde login
authRoute.post('/login', authController.login);



module.exports = authRoute;