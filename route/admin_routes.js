const router = require('express').Router()
const admin = require('../controller/admin_controller')
const {auth} = require('../auth/jwt_auth')


//booking router
router.post('/booking',auth,admin.newBooking)
router.get('/search/:id',auth,admin.searchBooking)
router.put('/update/:id',auth,admin.updateBooking)
router.delete('/delete/:id',auth,admin.deleteBooking)
router.get('/latest',auth,admin.latestSchedule)


// doctor router
router.post('/doctor',auth,admin.addDoctor)
router.delete('/doctor/:id',auth,admin.deleteDoctor)
router.put('/doctor/:id',auth,admin.updateDoctor)
router.get('/doctors',auth,admin.findDoctor)


//banner router
router.post('/banner',admin.addBanner)
router.delete('/banner/:id',admin.deleteBanner)
router.get('/banners',admin.findBanner)



module.exports = router
