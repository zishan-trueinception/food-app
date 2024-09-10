const jwt = require('jsonwebtoken');

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

module.exports = { authMiddleware }