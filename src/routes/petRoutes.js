const express = require('express');
const multer = require('multer');
const path = require('path');
const { registerPet, getAllPets, deletePet, updatePet, getPet } = require('../Controller/petController');

// Configuración de multer para almacenar archivos en el sistema de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // Carpeta donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

// Importar el controlador petController
const petRouter = express.Router();

// Rutas
petRouter.get('/', getAllPets);
petRouter.get('/:name', getPet);
petRouter.post('/register/:ownerId', upload.single('image'), registerPet); // Modificado para manejar la subida de la imagen
petRouter.delete('/delete/:id', deletePet);
petRouter.patch('/update/:id', updatePet);

module.exports = petRouter;