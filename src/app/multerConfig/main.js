const multer = require('multer')

const fileStorage = multer.diskStorage({
  filename: (req, file, callback) => callback(null, file.originalname)
})

const fileFilter = (req, file, callback) => {
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg']
  fileTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false)
}

module.exports = {
  fileStorage, 
  fileFilter
}