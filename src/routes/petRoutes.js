const express = require('express');
const upload = require('../middleware/multerConfig');
const authMiddleware = require('../middleware/authMiddleware');
const { registerPet, deletePet, updatePet, getPet, getAllPets } = require('../Controller/petController');
const { listAdoptablePets } = require('../Controller/adoptionController');

// Importar el controlador petController
const petRouter = express.Router();

// Rutas
petRouter.get('/', authMiddleware, getAllPets);//Listar todas las mascotas
petRouter.get('/:id', authMiddleware, getPet); //listar mascota por ID de mascota
petRouter.post('/register/:ownerId?', registerPet); //Crear mascotas Con o sin usuario
petRouter.patch('/update/:id',authMiddleware, updatePet);//Editar mascotas
petRouter.delete('/delete/:id',authMiddleware, deletePet);//Eliminar mascotas

module.exports = petRouter;