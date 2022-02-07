const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({

    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'member'
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

const admin = mongoose.model('admin',adminSchema)
module.exports = admin
