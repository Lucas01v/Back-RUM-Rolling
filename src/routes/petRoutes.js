const express = require('express');
const upload = require('../middleware/multerConfig');
const { authMiddleware } = require('../middleware/authMiddleware');
const { registerPet, getAllPets, deletePet, updatePet, getPet } = require('../Controller/petController');

// Importar el controlador petController
const petRouter = express.Router();

// Aplicar el middleware de autenticación a todas las rutas
petRouter.use(authMiddleware);

// Rutas
petRouter.get('/', getAllPets);
petRouter.get('/:id', getPet);
petRouter.post('/register/:ownerId', upload.single('image'), registerPet); // Modificado para manejar la subida de la imagen
petRouter.delete('/delete/:id', deletePet);
petRouter.patch('/update/:id', updatePet);

module.exports = petRouter;