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

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
      const { email, password, name, DNI, phone} = req.body;
  
      // Verificar que todos los campos requeridos estén presentes
      if (!email || !password || !name || !DNI || !phone ) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
  
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
  
      // Crear un nuevo usuario
      const newUser = new User({ email, password, name, phone, DNI });
      await newUser.save();
  
      // Devolver respuesta con el nuevo usuario registrado
      return res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: newUser });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return res.status(500).json({ message: 'Error al registrar usuario', error });
    }
  }

module.exports = { login, registerUser};