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

module.exports = getAllUsers;