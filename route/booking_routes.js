const router = require('express').Router()
const Booking = require('../controller/booking_controller')
const {auth} = require('../auth/jwt_auth')


router.post('/booking',auth,Booking.booking)

module.exports = router