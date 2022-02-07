const bcrypt = require('bcrypt')
const User = require('../models/usermodel')
const Comment = require('../models/commentmodel')
const { reg_valid, login_valid, comment_valid } = require('../auth/valid')
const jwt = require('jsonwebtoken')
const uploadCloud = require('../multer/uploadCloud')
const fs = require('fs')
const path = require('path')
require('dotenv').config()


// ********************user router***********************
exports.registerUser = async (req, res) => {
    try {
        // checking data validation
        const { error } = reg_valid(req.body)
        if (error) {
            return res.json(error.details[0].message)
        }

        //checking duplicate email not save in databased
        const userdata = await User.findOne({ email: req.body.email })
        if (userdata) {
            return res.json('email already exist')
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        //new data model create
        const newdata = new User
            ({
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                password: hashPassword
            })


        try {
            //save to database
            const result = await newdata.save()
            const { ...data } = result._doc
            res.send(data)
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
            const exitEmail = await User.findOne({ email: req.body.email })
            if (!exitEmail) {
                return res.json('email not exist please login')
            }

            //compare hash password
            const validpassword = await bcrypt.compare(req.body.password, exitEmail.password)
            if (!validpassword) {
                return res.json('password is incorrect')
            }

            const payload = { id: exitEmail._id, role: exitEmail.role }

            const secret = process.env.SECRET

            const options = { expiresIn: process.env.EXPIRE }
            //new token generate
            const token = jwt.sign(payload, secret, options)

            //ref token genreate
            const ref_secret = process.env.REF_SECRET

            const refToken = jwt.sign(payload, ref_secret)

            res.json({
                data: exitEmail,
                newtoken: token,
                refToken: refToken
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
exports.dashboard = async (req, res) => {
    res.send('dashboard')
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


