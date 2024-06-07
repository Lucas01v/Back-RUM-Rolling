const Adoption = require('../models/adoptionModel');
const Pet = require('../models/Pet');

const adoptPet = async (req, res) => {
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

module.exports = {adoptPet};