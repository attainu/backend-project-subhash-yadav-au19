const Booking = require('../models/booking_model')
const User = require('../models/usermodel')
const { booking_valid } = require('../auth/valid')
const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config()

// to open Booking page
exports.openBooking = (req, res) => {
  res.render('booking',{
    style: 'booking.css'
  })
}


// to book appointment
exports.booking = async (req, res) => {
  try {
    if (req.body.person === 'self') {
      try{
        const email = 'shiva@gmail.com'
        let user = await User.findOne({email})
      
        req.body.email = user.email
        req.body.name = user.name
        req.body.phone = user.phone

      } catch(error){
          return res.send(error)
      }
    }
    
    // checking data validation
    console.log(req.body)
    
    const { error } = booking_valid(req.body)
    if (error) {
      console.log(1)
      return res.json(error.details[0].message)
    }

    // email check for not dubplicate 
    const bookingUser = await Booking.findOne({ email: req.body.email })
    if (bookingUser) {
      return res.json('You have already book an apppointment with this Email')
    }

    // //phone number shoube different
    const bookingUserphone = await Booking.findOne({ phone: req.body.phone })
    if (bookingUserphone) {
      return res.json('You have already book an apppointment with this Phone')
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
        time: req.body.time,
        person: req.body.person,
        description: req.body.description
      })


    try {
      //save user booking to database
      const result = await bookingData.save()
      const { ...data } = result._doc

      // send email to user of booking number
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
        text: 'booking are booked '  + data._id
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

