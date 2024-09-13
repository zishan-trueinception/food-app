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
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "No token provided",
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized User",
                });
            } else {
                // Assuming _id is the correct field
                console.log(decoded.id)
                const isAdmin = await verify(decoded.id); 

                if (!isAdmin) {
                    return res.status(401).send({
                        success: false,
                        message: "Only Admin Access",
                    });
                }

                // If everything is fine, continue
                next();
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Authentication Server",
        });
    }
};

async function verify(userId) {
    try {
        const user = await adminModel.findById(userId);
        return user && user.usertype === "admin";
    } catch (error) {
        console.error("Error verifying admin:", error);
        return false;
    }
}



module.exports = { authMiddleware , adminAccessMiddleware}