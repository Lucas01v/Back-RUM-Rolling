const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const emailAdmin = process.env.EMAIL_ADMIN;
const passAdmin = process.env.PASS_ADMIN;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificación especial para el super usuario
        if (email === emailAdmin && password === passAdmin) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });
            console.log('Logueo correcto como super usuario');
            console.log('Token:', token);
            return res.status(200).send({ message: 'Logueo correcto como super usuario', token });
        }

        // Buscar al usuario por el email en la base de datos
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('¿Contraseña válida?', isPasswordValid);
        if (!isPasswordValid) {
            console.log('Contraseña inválida');
            return res.status(401).send({ error: 'Contraseña invalida' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Logueo correcto');
        console.log('Token:', token);

        // Si las credenciales son válidas, enviar una respuesta exitosa con el token
        res.status(200).send({ message: 'Logueo correcto', token });
    } catch (err) {
        // Manejar errores
        console.error('Error en el login:', err);
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
};

module.exports = { login };