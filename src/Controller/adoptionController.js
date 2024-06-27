
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

const adoptPet = async (req, res) => {
  console.log('llegaste por aquí');

  const { petId, homeDescription, lifestyle } = req.body;
  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    const newAdoption = new Adoption({
      userId: req.user.id,
      petId,
      homeDescription,
      lifestyle,
    });

    const adoption = await newAdoption.save();
    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Función para obtener todas las adopciones (ADMIN)
const getAllAdoptions = async (req, res) => {
  try {
    
    const adoptions = await Adoption.find().populate('petId');
    
    res.json(adoptions);
  } catch (err) {
    
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Función para listar adopciones de un usuario (por userID)

const getAdoptionsByUserId = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ userId: req.params.userId });
    res.json(adoptions);
  } catch (err) {
    console.error('Error fetching user adoptions:', err.message);
    res.status(500).send('Server error');
  }
}; 

const updateAdoption = async (req, res) => {
  const { homeDescription, lifestyle } = req.body;
  try {
    let adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ msg: 'Adoption no encontrada' });
    }

    /*  if (adoption.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuario no autorizado' });
    }  */
    adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      { $set: { homeDescription, lifestyle } },
      { new: true }
    );
    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteAdoption = async (req, res) => {
  try {
    let adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ msg: 'Adopcion no encontrada' });
    }

/*     if (adoption.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    } */

    await Adoption.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Adopcion Eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Función para listar todas las mascotas sin dueño
const listAdoptablePets = async (req, res) => {
  try {
      const adoptablePets = await Pet.find({ owner: null }); // Busca todas las mascotas que no tienen dueño
      res.status(200).json(adoptablePets); // Responde con el estado 200 (ok) y la lista de mascotas adoptables
  } catch (error) {
      res.status(500).json({ message: 'Error fetching adoptable pets', error }); // Si ocurre un error, responde con 500 (error interno del servidor)
  }
};
module.exports = { getAllAdoptions, getAdoptionsByUserId, adoptPet, updateAdoption, deleteAdoption, listAdoptablePets };
