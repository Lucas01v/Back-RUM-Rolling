const express = require('express');
const { adoptPet } = require('../controllers/adoptionController');
const authUser = require('../middlewares/authToken');

// const { login } = require('../controllers/authController');
// const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/adopt', authUser, adoptPet);

module.exports = router;
