const jwt = require('jsonwebtoken');
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Sin token, acceso denegado' });
        }
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Sin token, acceso denegado' });
        }

        let decoded;
        try {
            // Intentar verificar el token usando la clave secreta de usuario regular
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
                // Si la firma es inválida, intentar verificar con la clave secreta de admin
                decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
                // Si el token es válido con la clave de admin, establecer el rol de admin
                req.user = { email: decoded.email, role: 'admin' };
                return next();
            } else {
                throw err;
            }
        }

        // Si el token es válido, buscar al usuario en la base de datos
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado, acceso denegado' });
        }

        // Establecer el usuario y el rol en la solicitud
        req.user = { id: user._id, email: user.email, role: 'user' };

        // Continuar con la siguiente función en el middleware
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'El token no es válido' });
    }
};


module.exports = authMiddleware ;
