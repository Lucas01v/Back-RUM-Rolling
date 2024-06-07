const express = require('express');
const upload = require('../middleware/multerConfig'); // Importar el middleware de multer
const { registerPet, getAllPets, deletePet, updatePet, getPet } = require('../Controller/petController');

// Importar el controlador petController
const petRouter = express.Router();

// Rutas
petRouter.get('/', getAllPets);
petRouter.get('/:id', getPet);
petRouter.post('/register/:ownerId', upload.single('image'), registerPet); // Modificado para manejar la subida de la imagen
petRouter.delete('/delete/:id', deletePet);
petRouter.patch('/update/:id', updatePet);

module.exports = petRouter;