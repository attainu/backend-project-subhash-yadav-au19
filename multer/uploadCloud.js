const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//image upload to cloudinary
exports.uploads = async function (localpath){
    const filepathtocloud = localpath
    return cloudinary.uploader.upload(localpath, {"public_id":filepathtocloud})
    .then((result)=>{
        return {
            message: "Success",
            url: result.url
        }
    }).catch((error)=>{
            return {
                message: "Fail"
            }
        })
    }
