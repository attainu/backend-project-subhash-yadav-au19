const bcrypt = require('bcrypt')
const User = require('../models/usermodel')
const Comment = require('../models/commentmodel')
const { reg_valid, login_valid, comment_valid } = require('../auth/valid')
const jwt = require('jsonwebtoken')
const uploadCloud = require('../multer/uploadCloud')
const fs = require('fs')
const path = require('path')
require('dotenv').config()



// To get welcome page of the website
exports.getWelcomePage = (req, res) => {
    res.render('index', {
        title: 'index',
        style: 'index.css'
    })
}


// ********************user router***********************
// From Welcome page to signup page
exports.postToGetSignUp = (req, res) => {
    res.render('signUp', {
        title: 'signUp',
        style: 'signUp.css'
    })
}

// From Welcome page to login page
exports.postToGetLogin = (req, res) => {
    res.render('login', {
        title: 'login',
        style: 'login.css'
    })
}

// To finish signUp
exports.registerUser = async (req, res) => {
    try {
        // checking data validation
        const { error } = reg_valid(req.body)
        console.log(req.body)
        if (error) {
            console.log(1)
            return res.json(error.details[0].message)
        }

        console.log(2)

        //checking duplicate email not save in databased
        const userdata = await User.findOne({ email: req.body.email })
        if (userdata) {
            return res.json('Email is already existing')
        }

        console.log(3)

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        // upload profile picture
        let path = req.file.path.replace(/\\/g,"/")
        let result = await uploadCloud.uploads(path)

        console.log(4)

        // capitalise the first letter of the name
        let name = req.body.name
        let profileName = name.charAt(0).toUpperCase() + name.slice(1)

        //new data model create
        const newdata = new User
            ({
                name: profileName,
                age: req.body.age,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                password: hashPassword,
                profile: result.url,
                disorders: req.body.disorders,
                skin: req.body.skin,
                role: req.body.role,
            })
        
        console.log(newdata)

        try {
            //save to database
            const newUser = await newdata.save()
            // const { ...data } = newUser._doc
            // res.send(data)
            res.render('profile', {
                title: 'profile',
                style: 'profile.css',
                name: profileName,
                profile: result.url
            })
        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        try {
            //checking valid data form client 
            const { error } = login_valid(req.body)
            if (error) {
                return res.json(error.details[0].message)
            }

            //checking email available in database or not
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.json('email not exist please login')
            }

            //compare hash password
            const validpassword = await bcrypt.compare(req.body.password, user.password)
            if (!validpassword) {
                return res.json('password is incorrect')
            }

            const payload = { id: user._id, role: user.role }

            const secret = process.env.SECRET

            const options = { expiresIn: process.env.EXPIRE }
            //new token generate
            const token = jwt.sign(payload, secret, options)

            //ref token genreate
            const ref_secret = process.env.REF_SECRET

            const refToken = jwt.sign(payload, ref_secret)


            let name = user.name
            let profileName = name.charAt(0).toUpperCase() + name.slice(1)
            let profilePic = user.profile
            // res.json({
            //     data: user,
            //     newtoken: token,
            //     refToken: refToken
            // })
            res.render('profile', {
                title: 'profile',
                style: 'profile.css',
                name: profileName,
                profile: profilePic
            })

        } catch (error) {
            res.send(error)
        }
    } catch (error) {
        res.send(error)
    }
}

// exports.userUpdate = async (req, res) => {
//     try {
//         const id = req.params.id
//         // const file = req.file
//         const localfilepath=req.file.path.replace(/\\/g,"/")
//         // console.log(file)
//         // console.log(JSON.stringify(req.file))
//         console.log(localfilepath)    
        // // checking data validation
        // const { error } = reg_valid(req.body)
        // console.log('error-> '+error)
        // if (error) {
        //     return res.json(error.details[0].message)
        // }
        //upload image
        
        
    //     let result
    //     try {
    //         if(file){

    //             const localpath = file.path.replace(/\\/g,'/')
    //             console.log('localpath-->'+localpath)
    //             const url = await uploadCloud(localpath)
    //             result=url
    //             console.log(result)
    //             fs.unlinkSync(localpath)
                
    //         }
    //         else{
    //             result=null
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     //hash password
    //     const salt = await bcrypt.genSalt(10)
    //     const hashPassword = await bcrypt.hash(req.body.password, salt)
    //     //new data model create
    //     const newdata = new User
    //         ({
    //             username: req.body.username,
    //             email: req.body.email,
    //             role: req.body.role,
    //             profile: result,
    //             password: hashPassword
    //         })

        
    //     const userDate = await User.findByIdAndUpdate(id, newdata)
    //     try {
    //         if (!userDate) {
    //             return res.json('user id not valid')
    //         }
    //         res.send(userDate)

    //     } catch (error) {
    //         res.send('error client side')
    //     }

//     } catch (error) {
//         res.send(error)
//     }
// }




exports.userDelete = async (req,res) =>{
    try {
        const id = req.params.id
        const userdata = await User.findByIdAndDelete(id)
        try {
            if(!userdata){
                res.send('wrong id ')
            }
            res.send(`user is delete ${userdata}`)
        } catch (error) {
            res.send(error)
        }
        
    } catch (error) {
        res.send(error)
    }
}

//website dashboard
exports.profile = async (req, res) => {
    res.render('profile')
}

//comment router
exports.createComment = async (req, res) => {
    try {
        // checking data validation
        const { error } = comment_valid(req.body)
        if (error) {
            return res.json(error.details[0].message)
        }
        //doctor data save in  model 
        const commentData = new Comment({
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
            star: req.body.star,
            profile: req.body.profile
        })
        try {
            const result = await commentData.save()
            const { ...data } = result._doc
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    } catch (error) {
        res.json(error)
    }

}


exports.deleteComment = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Comment.findByIdAndDelete(id)
        try {
            if (!data) {
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


exports.updateComment = async (req, res) => {
    try {
        // checking data validation
        const { error } = comment_valid(req.body)
        if (error) {
            return res.json(error.details[0].message)
        }
        const id = req.params.id
        const data = await Comment.findByIdAndUpdate(id, req.body)
        try {
            if (!data) {
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


