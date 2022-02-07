const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
    cloud_name:"subhash12344u",
    api_key:"964189629522547",
    api_secret :"sr7m1CA62stm8gaACY6s0xU8_ng"
})

// store the file in upload folder
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../upload')
    },
    filename:function(req,file,cb){
        console.log(file.originalname)
        cb(null,file.originalname)
    }
})

//file validation
const filterfile = function(req,file,cb){
    if(file.mimetype==='image.jpg' || file.mimetype=='image.png'){
        cb(null,true)
    }else{
        cb({message:'unsupported file'},false)
    }
}

const upload = multer({
    storage:storage,
    // fileFilter:filterfile,
    // limits:{fileSize:1024*10}
})

module.exports = upload