const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err, decoded) => {
            if(err){
                res.status(401).send({
                    success: false,
                    message: "Unauthorized User"
                })  
            }else{
                req.body.id = decoded.id;
                next();
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Authentication Server",
        })
    }
}



const adminAccessMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err, decoded) => {
            if(err){
                res.status(401).send({
                    success: false,
                    message: "Unauthorized User"
                })  
            }else{
                console.log(decoded.id)

                
              verify(decoded);

                next();
            }
        });

        

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Authentication Server",
        })
    }
}

async function verify(decoded) {
       console.log(decoded.id)
       const user = await adminModel.findById(decoded._id);
       if(user.usertype !== "admin"){
           return res.status(401).send({
               success: false,  
               message: "Only Admin Access",
           })
       }else{
         next();
       }
}





module.exports = { authMiddleware , adminAccessMiddleware}