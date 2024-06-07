const express = require('express');
const { adoptPet } = require('../controllers/adoptionController');
// const auth = require('../middlewares/authMiddleware');

const adoptionRouter = express.Router();

router.post('/adopt', adoptPet); // agregar middlewares de auth y validate token

module.exports = adoptionRouter;