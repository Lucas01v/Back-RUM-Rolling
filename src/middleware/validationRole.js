const checkRole = (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado' });
    }
};

module.exports = checkRole;
