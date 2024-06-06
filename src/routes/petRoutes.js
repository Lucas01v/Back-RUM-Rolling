const express = require('express');
const { registerPet, getAllPets, deletePet, updatePet } = require('../controllers/petController');

//importar  el controlador petController
const petRouter = express.Router();

// rutas
petRouter.get('/', getAllPets);
petRouter.post('/register', registerPet);
petRouter.delete('/delete/:id', deletePet);
petRouter.patch('/update/:id', updatePet);


// Obtener una mascota por ID
petRouter.get('/:name', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.name).populate('owner');
        if (!pet) {
            return res.status(404).send({ error: 'Mascota no encontrada' });
        }
        res.status(200).send(pet);
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
});

module.exports = petRouter;