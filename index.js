const express = require('express');
const path = require('path')
const app = express();
require('dotenv').config()

// mongoose connection
const {mongoDB} = require('./config/databased')
mongoDB()

//set engine template
const {engine} = require('express-handlebars')
app.engine('views',engine({
    defaultLayout:'main',
    extname:'.hbs'
}))

app.set('views engine','hbs')
//serving statics file
app.use('/css',express.static(path.resolve(__dirname,'assests/css')))
app.use('/img',express.static(path.resolve(__dirname,'assests/img')))
app.use('/js',express.static(path.resolve(__dirname,'assests/js')))

//middle ware for data transfer client to server
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// route for website
const router = require('./route/user_routes')
//user login and register router
app.use('/user',router)

const bookingRoute = require('./route/booking_routes')
// user booking routes
app.use('/query',bookingRoute)

const adminRoute = require('./route/admin_routes')
//admin routes
app.use('/admin',adminRoute)




app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`)
})