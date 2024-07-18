// middlewares/multer.js
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Formato de archivo no soportado'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 } // 5 MB máximo
});

module.exports = upload;
