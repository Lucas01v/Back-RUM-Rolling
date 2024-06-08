const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas de citas
router.post('/create', authMiddleware, appointmentController.createAppointment); // Ruta para crear una nueva cita (requiere autenticación)
router.get('/', authMiddleware, appointmentController.getAppointments); // Ruta para obtener las citas del usuario (requiere autenticación)

module.exports = router;

