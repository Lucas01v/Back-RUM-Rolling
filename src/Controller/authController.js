const bcrypt = require('bcrypt');
const User = require('../models/User');

const login = async (req, res) => {

    console.log('contoller login funcionando...')
    
        try {
            const { nick, password } = req.body;
            // Buscar al usuario por el nick en la base de datos
            const user = await User.findOne({ nick });
            // Verificar si el usuario existe
            if (!user) {
                return res.status(404).send({ error: 'Usuario no encontrado' });
            }
            // Verificar si la contraseña es correcta
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                return res.status(401).send({ error: 'Contraseña invalida' });
            }
    
            // Si las credenciales son válidas, enviar una respuesta exitosa
            res.status(200).send({ message: 'Logueo correcto' });
        } catch (err) {
            // Manejar errores
            res.status(500).send({ error: 'An unexpected error occurred' });
        }
    };

    
module.exports ={login}