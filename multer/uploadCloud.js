//image upload to cloudinary
exports.uploadtocloud = async(localpath)=>{
    const filepathtocloud=localpath
    return cloudinary.uploader.upload(localpath,{public_key:filepathtocloud})
    .then((result)=>{
        return{
            url:result.url
        }
    })
    .catch((err)=>{
        return{
            msg:err,
        }
    })
}