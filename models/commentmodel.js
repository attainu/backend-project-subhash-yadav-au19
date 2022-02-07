const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    star:{
        type:Array,
        default:5
    },
    profile:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const comment = mongoose.model('comment',commentSchema)
module.exports = comment












