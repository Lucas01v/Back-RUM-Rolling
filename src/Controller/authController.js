const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Verificación especial para el super usuario
        if (email === 'admin@admin.com' && password === 'admin') {
            //const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).send({ message: 'Logueo correcto como super usuario', token });
        }

        // Buscar al usuario por el email en la base de datos
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Contraseña invalida' });
        }

        // Generar un token JWT
        //const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //console.log(token);

        // Si las credenciales son válidas, enviar una respuesta exitosa con el token
        res.status(200).send({ message: 'Logueo correcto', token });
    } catch (err) {
        // Manejar errores
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
};

module.exports = { login };