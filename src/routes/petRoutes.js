const express = require('express');
const upload = require('../middleware/multerConfig');
const authMiddleware = require('../middleware/authMiddleware');
const { registerPet, deletePet, updatePet, getPet, getAllPets } = require('../Controller/petController');

// Importar el controlador petController
const petRouter = express.Router();

// Rutas
petRouter.get('/:id', authMiddleware, getPet);
petRouter.get('/:ownerId',authMiddleware, getAllPets);
petRouter.get('/adopt',authMiddleware, getAllPets);
petRouter.post('/register/:ownerId',authMiddleware, upload.single('image'), registerPet); // Modificado para manejar la subida de la imagen
petRouter.delete('/delete/:id',authMiddleware, deletePet);
petRouter.patch('/update/:id',authMiddleware, updatePet);


module.exports = petRouter;