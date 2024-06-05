const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

// Registrar usuario
// JOYA
router.post('/registro', async (req, res) => {
    try {
        const { nick, password, name, phone, email } = req.body;
        const nuevouser = new User({ nick, password, name, phone, email });
        await nuevouser.save();
        res.status(201).send(nuevouser);
        console.log('usuario ' + nick + ' registrado')
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Eliminar un usuario por nick 
// JOYA
router.delete('/:nick', async (req, res) => {
    try {
        const nick = req.params.nick;
        const user = await User.findOneAndDelete({ nick: nick });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        console.log('usuario ' + nick + ' eliminado')
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
        const errorMessage = err.message || 'An unexpected error occurred';
        res.status(500).send({ error: errorMessage });
    }
});

// Obtener un usuario por nick
// JOYA
router.get('/:nick', async (req, res) => {
    try {
        const user = await User.findOne({ nick: req.params.nick });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});

module.exports = router;
