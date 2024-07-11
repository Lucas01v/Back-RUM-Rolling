const express = require('express');
const upload = require('../middleware/multerConfig');
const authMiddleware = require('../middleware/authMiddleware');
const { registerPet, deletePet, updatePet, getPet, getAllPets } = require('../Controller/petController');
const { listAdoptablePets } = require('../Controller/adoptionController');

const petRouter = express.Router();


petRouter.get('/', authMiddleware, getAllPets);
petRouter.get('/:id', authMiddleware, getPet);
petRouter.post('/register/:ownerId?', registerPet);
petRouter.patch('/update/:id',authMiddleware, updatePet);
petRouter.delete('/delete/:id',authMiddleware, deletePet);

module.exports = petRouter;