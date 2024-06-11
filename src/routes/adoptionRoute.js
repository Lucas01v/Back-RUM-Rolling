const express = require('express');
const { adoptPet, getAdoptionsByUserId } = require('../controllers/adoptionController');
const authUser = require('../middlewares/authToken');

// const { login } = require('../controllers/authController');
// const auth = require('../middlewares/authMiddleware');
const adoptionRoute = express.Router();

//Adopción
adoptionRoute.post('/adopt', authUser, adoptPet);
adoptionRoute.get('/', authUser, getAdoptionsByUserId); //requiere el token para listar las adopciones por ID

module.exports = adoptionRoute;
