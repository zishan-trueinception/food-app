const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const { route } = require("../routes/testRoutes");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Register route
const adminController = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await adminModel.create({
      email,
      password: hashedPassword
    });

    return res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration API",
    });
  }
};


// Login route ....
const adminloginController = async (req,res)=>{
  try {
   const { email, password } = req.body;
   // Validation
   if(!email || !password){
       return res.status(500).send({
           success:false,
           message:"Please provide email and password"
       });
   };
   //check if user exists
   const admin = await adminModel.findOne({email});
   if(!admin){
       return res.status(500).send({
           success:false,
           message:"admin not found"
       });
   };
   // compare password | check user password
   const match = await bcrypt.compare(password,admin.password);
   if(!match){
       return res.status(500).send({
           success:false,
           message:"Incorrect password"
       });
   }
   // token 
   const token = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"7d"});


   // password hide | send response
   admin.password = undefined;
   res.status(200).send({
       success:true,
       message:"Login successfully",
       token,
       admin
   });
 

  } catch (error) {
   console.log(error);
   res.status(500).send({
       success:false,
       message:"Error in Registration API"
   });
}}








module.exports = {adminController,adminloginController}