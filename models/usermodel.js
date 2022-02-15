const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
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
    disorders:{
        type:[String],
        require:true
    },
    skin:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'Member'
    },
    comments: {
        type:[String]
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

const user = mongoose.model('testuser',userSchema)
module.exports = user
