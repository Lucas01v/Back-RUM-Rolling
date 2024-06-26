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

// Obtener todas las mascotas de un usuario por su ID
const getUserPets = async (req, res) => {
  try {
      const userId = req.params.userId;

      // Buscar al usuario por su ID
      const user = await User.findById(userId).populate('pets');
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Devolver las mascotas del usuario
      res.status(200).json({ message: 'Mascotas recuperadas exitosamente', pets: user.pets });
  } catch (error) {
      console.error("Error al recuperar las mascotas del usuario:", error);
      res.status(500).json({ error: 'Error al recuperar las mascotas del usuario' });
  }
};

//Editar usuario por id

// Actualizar un usuario por su ID
const updateUser = async (req, res) => {
  
  const { email, password, name, DNI, phone } = req.body;
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si los campos a actualizar son válidos
    const allowedFields = ['email', 'password', 'name', 'DNI', 'phone'];
    const fieldsToUpdate = {};
    Object.keys(req.body).forEach(field => {
      if (allowedFields.includes(field)) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    // Actualizar usuario con los campos especificados
    user = await User.findByIdAndUpdate(req.params.userId, { $set: fieldsToUpdate }, { new: true });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};


const deleteUser = async (req, res) => {
  try {
      const userId = req.body.userId; // Obtener el ID del usuario desde el cuerpo de la solicitud
      const deletedUser = await User.findByIdAndDelete(userId); // Buscar y eliminar al usuario por su ID
      if (!deletedUser) {
          return res.status(404).json({ error: 'Usuario no encontrado' }); // Si el usuario no se encuentra, devuelve un error
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' }); // Si se elimina correctamente, devuelve un mensaje de éxito
  } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario', message: error.message }); // Si hay algún error, devuelve un error
  }
};

module.exports = { getAllUsers, getUserPets, updateUser, deleteUser};