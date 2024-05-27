const express = require('express');
const Pet = require('../models/Pet');
const User = require('../models/User');
const router = express.Router();

// Crear mascota
// JOYA
router.post('/register', async (req, res) => {
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
});

// Obtener todas las mascotas
// JOYA
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).send(pets);
    } catch (err) {
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});

// Obtener una mascota por ID
// JOYA
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner');
        if (!pet) {
            return res.status(404).send({ error: 'Pet not found' });
        }
        res.status(200).send(pet);
    } catch (err) {
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});

// Eliminar mascota
// JOYA
router.delete('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).send({ error: 'Pet not found' });
        }

        // Buscar al usuario por su nick y decrementar el contador de mascotas
        const owner = await User.findOne({ nick: pet.owner });
        if (owner) {
            owner.petCount -= 1;
            await owner.save();
        }

        res.status(200).send({ message: 'Pet deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});

module.exports = router;