const express = require('express');
const { registerPet, getAllPets, deletePet, updatePet } = require('../controllers/petController');

//importar  el controlador petController
const petRouter = express.Router();

// rutas
petRouter.get('/', getAllPets);
petRouter.post('/register', registerPet);
petRouter.delete('/delete/:id', deletePet);
petRouter.patch('/update/:id', updatePet);


// Crear mascota
// JOYA
/* petRouter.post('/register', async (req, res) => {
    try {
        const {ownerNick, species, name, race, age} = req.body;

        // Buscar el usuario por su nick
        const owner = await User.findOne({ nick: ownerNick });
        if (!owner) {
            return res.status(404).send({ error: 'Owner not found' });
        }

        const newPet = new Pet({ owner: owner.nick , species, name, race, age});
        await newPet.save();

        // Incrementar el contador de mascotas del usuario
        owner.petCount += 1;
        await owner.save();

        res.status(201).send(newPet);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}); */

// Obtener todas las mascotas
// JOYA
petRouter.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).send(pets);
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
});


//CAMBIAR POR FILTRO DE ID POR UNO DE NOMBRE
// Obtener una mascota por ID
// JOYA
petRouter.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner');
        if (!pet) {
            return res.status(404).send({ error: 'Mascota no encontrada' });
        }
        res.status(200).send(pet);
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
});

// Eliminar mascota
// JOYA
/* petRouter.delete('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).send({ error: 'Mascota no encontrada' });
        }

        // Buscar al usuario por su nick y decrementar el contador de mascotas
        const owner = await User.findOne({ nick: pet.owner });
        if (owner) {
            owner.petCount -= 1;
            await owner.save();
        }

        res.status(200).send({ message: 'Mascota eliminada correctamente' });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
}); */

module.exports = petRouter;