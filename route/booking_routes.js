const router = require('express').Router()
const Booking = require('../controller/booking_controller')
const {auth} = require('../auth/jwt_auth')

// To open booking page
router.post('/openBooking',Booking.openBooking)

// To submit booking
router.post('/booking',Booking.booking)

module.exports = router