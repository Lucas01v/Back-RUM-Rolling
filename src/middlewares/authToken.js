const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authUser = async (req, res, next) => {
  try {
    // Obtener el token del header
    const authHeader = req.header('x-auth-token');
    if (!authHeader) {
      return res.status(401).json({ message: 'Sin token, acceso denegado' });
    }

    // Reemplazar el prefijo 'Bearer ' si está presente
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Sin token, acceso denegado' });
    }

    // Verificar el token utilizando la clave secreta desde process.env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario en la base de datos
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no encontrado, acceso denegado' });
    }

    // Continuar con la siguiente función en el middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'El token no es valido' });
  }
};

module.exports = authUser ;