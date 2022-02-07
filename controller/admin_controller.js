const Booking = require('../models/booking_model')
const Doctor = require("../models/doctormodel")
const Banner = require('../models/bannermodel')
const {booking_valid, doctor_valid, banner_valid } = require('../auth/valid')
const nodemailer = require('nodemailer');



//by create the booking by admin
exports.newBooking = async (req, res) => {
    try {
        // checking data validation
        const { error } = booking_valid(req.body)
        if (error) {
          return res.json(error.details[0].message)
        }
    
        // email check for not dubplicate 
        const bookingUser = await Booking.findOne({ email: req.body.email })
        if (bookingUser) {
          return res.json('one time one email used')
        }
    
        // //phone number shoube different
        const bookingUserphone = await Booking.findOne({ phone: req.body.phone })
        if (bookingUserphone) {
          return res.json('phone number only once time used')
        }
    
        //new data model create
        const bookingData = new Booking
          ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            date: req.body.date,
            message: req.body.message
          })
    
    
        try {
        //save user booking to database
          const result = await bookingData.save()
          const { ...data } = result._doc
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
            }
          });
    
          const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'APPOINTMENT BOOKING',
            text: 'your booking number' + data._id
          };
    
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.json(data)
          
        } catch (error) {
          res.send(error)
        }
      } catch (error) {
        res.send(error)
      }
}


//read booking by admin
exports.searchBooking = (req, res) => {
    const id = req.params.id
    res.send('serach' + id)
}


// delete the booking
exports.deleteBooking = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.send({ message: 'id not provided' })
        }

        const deleteData = await Booking.findByIdAndDelete(id)
        try {
            if (!deleteData) {
                res.status(404).send({ message: `cannot delete with id ${id} may be wrong ` })
            }
            else {
                res.send({ message: "user was deleted successfully" })
            }

        } catch (error) {
            res.status(500).send('error occuring to retriving the data')
        }

    } catch (error) {
        res.send(error)
    }
}


//update the booking
exports.updateBooking = async (req, res) => {
    try {
        const newData = req.body
        if (!newData) {
            return res.status(400).send({ message: "data to update can not be empty" })
        }

        const id = req.params.id
        const data = await Booking.findByIdAndUpdate(id, req.body)
        try {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id} maybe user id not found` })
            }
            else {
                res.send(data)
            }
            
        } catch (error) {
            res.status(500).send('error occuring to retriving the data')
        }
       

    } catch (error) {
        res.send(error).status(500)
    }
}


exports.latestSchedule = (req, res) => {
    res.send('latest schedule booking')
}





// **********************doctorlist******************
exports.addDoctor = async(req,res)=>{
    try {
         // checking data validation
        const { error } = doctor_valid(req.body)
        if (error) {
          return res.json(error.details[0].message)
        }
        //doctor data save in  model 
        const doctorData = new Doctor( {
            name:req.body.name,
            qualification:req.body.qualification,
            education:req.body.education,
            expirence:req.body.expirence,
            profile:req.body.profile
        })
        try {
            const result = await doctorData.save()
            const { ...data } = result._doc
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    } catch (error) {
        res.json(error)
    }

}


exports.deleteDoctor = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Doctor.findByIdAndDelete(id)
        try {
            if(!data){
                return res.status(400).send('wrong id are given')
            }
            res.send(`data is deleted ${data._id}`)
        } catch (error) {
            return res.send('error in client side')
        }
      
    } catch (error) {
        res.send(error)
    }
}


exports.updateDoctor = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Doctor.findByIdAndUpdate(id,req.body)
        try {
            if(!data){
                return res.status(400).send('wrong id are given')
            }
            res.send(`data is updated ${data._id}`)
        } catch (error) {
            return res.send('error in client side')
        }
      
    } catch (error) {
        res.send(error)
    }
}


exports.findDoctor = async(req,res)=>{
    try {
        const data = await Doctor.find()
        if(!data){
           return res.send('not find data')
        }
        res.json(data)

    } catch (error) {
       res.send(error) 
    }
}


//**************banner*******************/

exports.addBanner = async(req,res)=>{
    try {
         // checking data validation
        const { error } = banner_valid(req.body)
        if (error) {
          return res.json(error.details[0].message)
        }
        //doctor data save in  model 
        const bannerData = new Banner( {
            picture:req.body.picture
        })

        try {
            const result = await bannerData.save()
            const { ...data } = result._doc
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    } catch (error) {
        res.json(error)
    }

}


exports.findBanner = async(req,res)=>{
    try {
        const data = await Banner.find()
        if(!data){
           return res.send('not find data')
        }
        res.json(data)

    } catch (error) {
       res.send(error) 
    }
}

exports.deleteBanner = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Banner.findByIdAndDelete(id)
        try {
            if(!data){
                return res.status(400).send('wrong id are given')
            }
            res.send(`data is deleted ${data._id}`)
        } catch (error) {
            return res.send('error in client side')
        }
      
    } catch (error) {
        res.send(error)
    }
}

