
const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({

    name:{
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
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    person:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

const booking = mongoose.model('booking',bookingSchema)
module.exports = booking
