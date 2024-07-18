const Pet = require('../models/Pet');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
// const fs = require('fs');
// const path = require('path');

const registerPet = async (req, res) => {
    try {
      const ownerId = req.params.ownerId;
      const { species, name, race, sex, age, isAdoptable } = req.body;
  
      let owner = null;
  
      if (ownerId) {
        owner = await User.findById(ownerId);
        if (!owner) {
          return res.status(404).send({ error: 'Owner not found' });
        }
      }
  
      let image = null;
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'pets', // Especifica la carpeta de destino en Cloudinary
              resource_type: 'image',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.file.buffer);
        });
        image = result.secure_url;
      }
  
      const newPet = new Pet({
        owner: ownerId || null,
        species,
        name,
        race,
        sex,
        age,
        image,
        isAdoptable: isAdoptable !== undefined ? isAdoptable : ownerId ? false : true,
      });
  
      await newPet.save();
  
      if (owner) {
        owner.pets.push(newPet._id);
        await owner.save();
      }
  
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


const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).send({ error: 'Mascota no encontrada' });
        }
         if (pet.image) {
            const imagePath = path.join(__dirname, '..', pet.image); 
            console.log('Ruta completa de la imagen:', imagePath);

            
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    console.log('El archivo de la imagen existe, eliminando...');
                    fs.unlink(imagePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error al eliminar la imagen:', unlinkErr);
                        } else {
                            console.log('Foto eliminada');
                        }
                    });
                } else {
                    console.log('El archivo de la imagen no existe:', imagePath);
                }
            });
        }
        console.log('Eliminando mascota del usuario');
        const owner = await User.findById(pet.owner);
        if (owner) {
            console.log('Usuario encontrado');
            owner.pets.pull(pet._id); 
            await owner.save();
            console.log('Mascota eliminada del usuario');
        }

        
        console.log('Eliminando mascota de la base de datos');
        await Pet.findByIdAndDelete(req.params.id);
        console.log('Mascota eliminada de la base de datos');

        res.status(200).send({ message: 'Mascota eliminada correctamente' });
    } catch (err) {
        console.error('Error al eliminar mascota:', err);
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
        const { id } = req.params;
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).send({ error: 'Mascota no encontrada' });
        }
        res.status(200).send(pet);
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un error inesperado' });
    }
};

module.exports = {registerPet, getAllPets, deletePet, updatePet, getPet};