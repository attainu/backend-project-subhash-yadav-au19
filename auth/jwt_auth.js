const jwt = require('jsonwebtoken');
require('dotenv').config()
exports.auth = (req,res,next)=>{
    try {
        // access toekn from header
        const data = req.headers.authorization
        if(data){
            //split payload from token
            const token = data.split(' ')[1]
            try {
                const result = jwt.verify(token,process.env.SECRET)
                req.user=result
                next()
            } catch (error) {
                res.json({
                    data:"authentication error",
                    success:false
                })
            }
        }
        else{
            res.send('please login first')
        }
        
    } catch (error) {
        res.send(error)       
    }
}