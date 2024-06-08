const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar archivos en el sistema de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // Carpeta donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

module.exports = upload;