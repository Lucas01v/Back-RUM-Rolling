const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Login usuario
// JOYA
router.post('/login', async (req, res) => {
    try {
        const { nick, password } = req.body;
        // Buscar al usuario por el nick en la base de datos
        const user = await User.findOne({ nick });
        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        // Si las credenciales son válidas, enviar una respuesta exitosa
        res.status(200).send({ message: 'Login successful' });
    } catch (err) {
        // Manejar errores
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});

module.exports = router;
