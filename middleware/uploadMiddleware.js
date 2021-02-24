const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const type = /jpeg|jpg|png/
        const extName = type.test(path.extname(file.originalname).toLowerCase())
        const mimetype = type.test(file.mimetype)

        if (extName && mimetype) {
            cb(null, true)
        } else {
            cb(new Error('Only Support jpeg, jpg or png'))
        }
    }
})

module.exports = upload