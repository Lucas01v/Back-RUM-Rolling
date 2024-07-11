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

            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {

                decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

                req.user = { email: decoded.email, role: 'admin' };
                return next();
            } else {
                throw err;
            }
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado, acceso denegado' });
        }

        req.user = { id: user._id, email: user.email, role: 'user' };

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'El token no es válido' });
    }
};


module.exports = authMiddleware ;
