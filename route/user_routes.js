const router = require("express").Router();
const {
    postToGetSignUp,
    registerUser,
    postToGetLogin,
    loginUser,
    userUpdate,
    userDelete,
    profile,
    createComment,
    deleteComment,
    updateComment
} = require('../controller/user_controller')
const {auth} = require('../auth/jwt_auth')
const fileUpload = require('../multer/imgUpload')


// To get and post signup
router.get('/postToGetSignUp',postToGetSignUp)
router.post('/signUp', fileUpload.single('profile'),registerUser)

// To get and post login
router.get('/postToGetLogin',postToGetLogin)
router.post('/login',loginUser)

// To get user profile
router.get('/profile',auth,profile)

//user router
// router.put('/update/:id',upload.single('profile'),userUpdate)
router.delete('/update/:id',userDelete)



//comments router
router.post('/comment',auth,createComment)
router.delete('/comment/:id',auth,deleteComment)
router.put('/comment/:id',auth,updateComment)



module.exports= router