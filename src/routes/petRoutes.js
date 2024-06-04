const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, petController.addPet);
router.get('/', authMiddleware, petController.getPets);

module.exports = router;