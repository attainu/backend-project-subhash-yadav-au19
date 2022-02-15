const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploadedImages')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        cb({message: 'Unsupported file format'}, false)
    }
}

const fileUpload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024},
    fileFilter: fileFilter
})

module.exports = fileUpload