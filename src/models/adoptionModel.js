const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  homeDescription: { type: String, required: true },
  lifestyle: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

const Adoption = mongoose.model('Adoption', AdoptionSchema);

module.exports = {Adoption}
