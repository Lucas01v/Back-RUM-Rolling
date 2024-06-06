const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to authenticate token' });
        }

        // Si el token es válido, guardamos la información decodificada en el request para usarla en las rutas protegidas
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;