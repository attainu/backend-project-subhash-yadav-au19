const mongoose = require('mongoose')
require('dotenv').config()

exports.mongoDB = async() => {
    try {
        const con = await mongoose.connect(process.env.URL,{
            // useNewUrlParser:true,
            // useUnifiedTopolgy:true,
            // useFindAndModify:false,
            // useCreateIndex:true
        })
        console.log(`mongodb connected:${con.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
  
}
