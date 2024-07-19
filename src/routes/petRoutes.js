const express = require('express');
const upload = require('../middleware/multerConfig');
const authMiddleware = require('../middleware/authMiddleware');
const { registerPet, deletePet, updatePet, getPet, getAllPets } = require('../Controller/petController');
// const { listAdoptablePets } = require('../Controller/adoptionController');
const petRouter = express.Router();


petRouter.get('/', authMiddleware, getAllPets);
petRouter.get('/:id', authMiddleware, getPet);
petRouter.post('/register/:ownerId?', authMiddleware, upload.single('image'), registerPet);
petRouter.patch('/update/:id', authMiddleware, upload.single('image'), updatePet);
petRouter.delete('/delete/:id',authMiddleware, deletePet);

module.exports = petRouter;