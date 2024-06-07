//TRAE LOS USUARIOS DE LA BD
const User = require('../models/User');

// Listar usuarios de la BD
async function getAllUsers(req, res) {
  try {
    console.log("Recuperando usuarios...");
    const users = await User.find();
    console.log("Usuarios recuperados:", users);

    if (!users || users.length === 0) {
      console.log("No se encontraron usuarios");
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }

    // Envía la respuesta con los usuarios recuperados
    return res.status(200).json({ message: 'Usuarios recuperados de forma exitosa', usuarios: users });
  } catch (error) {
    console.error("Error al recuperar usuarios:", error);
    return res.status(500).json({ message: 'Error al recuperar usuarios', error });
  }
}

// Registrar un nuevo usuario
async function registerUser(req, res) {
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


module.exports = { getAllUsers, registerUser};