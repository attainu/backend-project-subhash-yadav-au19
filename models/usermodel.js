const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

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
    profile:{
        type:String,
        default:null
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

const user = mongoose.model('testuser',userSchema)
module.exports = user
