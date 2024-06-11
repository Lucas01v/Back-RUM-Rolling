const express = require('express');
// const authMiddleware = require('../middleware/authMiddleware'); // middleware de autenticación
const authUser = require('../middlewares/authToken');
const { getAllAdoptions, updateAdoption, deleteAdoption } = require('../controllers/adoptionController');

const adminRoute = express.Router();

//ADOPCIÓN
adminRoute.get('/', getAllAdoptions);
adminRoute.patch('/update/:id', updateAdoption);
adminRoute.delete('/delete/:id', deleteAdoption);

module.exports = adminRoute;
