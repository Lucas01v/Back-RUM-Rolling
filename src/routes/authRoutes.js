const express = require('express')
const authController = require('../Controller/authController');


const authRouter = express.Router();


authRouter.post('/login', authController.login);
authRouter.post('/register', authController.registerUser);



module.exports = authRouter;