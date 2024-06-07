const Pet = require('../models/Pet');
const User = require('../models/User');


const registerPet = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        const {species, name, race, age } = req.body;

        // Buscar el usuario por su nick
        const owner = await User.findById(ownerId);
        if (!owner) {
            return res.status(404).send({ error: 'Owner not found' });
        }

        // Obtener la URL de la imagen si existe
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newPet = new Pet({ owner: owner.name, species, name, race, age, image });
        await newPet.save();

        // Incrementar el contador de mascotas del usuario
        owner.petCount += 1;
        await owner.save();

        res.status(201).send(newPet);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const getAllPets =  async (req, res) => {
        try {
            const pets = await Pet.find();
            res.status(200).send(pets);
        } catch (err) {
            res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
        }
};

const deletePet =  async (req, res) => {
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
};

const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const petUpdated = await Pet.findByIdAndUpdate(id, updateData, { new: true });
        if (!petUpdated) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota actualizada exitosamente', pet: petUpdated });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la mascota', error: error.message });
    }
};

const getPet = async (req, res) => {
    try {
        const { name } = req.params;
        const pet = await Pet.findOne({ name });
        if (!pet) {
            return res.status(404).send({ error: 'Mascota no encontrada' });
        }
        res.status(200).send(pet);
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
};

module.exports = {registerPet, getAllPets, deletePet, updatePet, getPet};