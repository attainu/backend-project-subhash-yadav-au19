const router = require("express").Router();
const {registerUser,loginUser,userUpdate,userDelete,dashboard,createComment,deleteComment,updateComment} = require('../controller/user_controller')
const {auth} = require('../auth/jwt_auth')
const upload = require('../multer/imgUpload')

router.post('/signup',registerUser)
router.post('/login',loginUser)
router.get('/dashboard',auth,dashboard)

//user router
// router.put('/update/:id',upload.single('profile'),userUpdate)
router.delete('/update/:id',userDelete)



//comments router
router.post('/comment',auth,createComment)
router.delete('/comment/:id',auth,deleteComment)
router.put('/comment/:id',auth,updateComment)



module.exports= router