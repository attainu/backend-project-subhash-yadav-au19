const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({
    picture:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const banner = mongoose.model('banner',bannerSchema)
module.exports = banner
