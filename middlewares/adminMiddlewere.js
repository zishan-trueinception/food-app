const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel"); 
module.exports= async (req, res, next) => {
    try {
      const user = await adminModel.findById(req.body._id);
      if(user.usertype !== "admin"){
          return res.status(401).send({
              success: false,  
              message: "Only Admin Access",
          })
      }else{
        next();
      }
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unauthorized Access",
        }) 
    }
}

